import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { Message, Credentials } from "../types/authTypes";
import { createGreenApi } from "../api/greenApi";
import { useError } from "./ErrorContext";
import { ApiError } from "../types/errorTypes";

interface ChatContextType {
  credentials: Credentials | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ApiError | null;
  currentChat: string | null;
  messages: Message[];
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  setCurrentChat: (chatId: string | null) => void;
  sendMessage: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { error, setError } = useError();
  const api = createGreenApi(setError);

  const checkAndSetCredentials = useCallback(async (creds: Credentials) => {
    try {
      const isValid = await api.checkAuth(creds);
      if (isValid) {
        setCredentials(creds);
        setIsAuthenticated(true);
        localStorage.setItem("whatsapp-creds", JSON.stringify(creds));
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  }, []);

  const handleLogin = async (creds: Credentials) => {
    try {
      console.log(creds);
      setIsLoading(true);
      const isValid = await api.checkAuth(creds);
      if (!isValid) throw new Error("Invalid credentials");
      setCredentials(creds);
      setIsAuthenticated(true);
      localStorage.setItem("whatsapp-creds", JSON.stringify(creds));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setCredentials(null);
    setIsAuthenticated(false);
    setCurrentChat(null);
    setMessages([]);
    localStorage.removeItem("whatsapp-creds");
  };

  const handleSendMessage = async (text: string) => {
    if (!credentials || !currentChat) return;
    try {
      setIsLoading(true);
      const messageId = await api.sendMessage(credentials, currentChat, text);
      setMessages((prev) => [
        ...prev,
        {
          id: messageId,
          text,
          isMy: true,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const poolMessages = useCallback(async () => {
    if (!credentials || !currentChat) return;
    console.log(currentChat);
    console.log("pooling massages");
    try {
      const newMessages = await api.receiveMessages(credentials);
      setMessages((prev) => [
        ...prev,
        ...newMessages
          .filter((msg) => !prev.some((m) => m.id === msg.id))
          .map((msg) => ({
            ...msg,
            isMy: false,
          })),
      ]);
    } catch (error) {
      console.error("Polling error: ", error);
    }
  }, [credentials, currentChat]);

  useEffect(() => {
    const storedCreds = localStorage.getItem("whatsapp-creds");
    if (storedCreds) {
      checkAndSetCredentials(JSON.parse(storedCreds));
    }
  }, [checkAndSetCredentials]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;

    const interval = setInterval(() => {
      if (isMounted) {
        poolMessages();
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isAuthenticated, poolMessages]);

  return (
    <ChatContext.Provider
      value={{
        credentials,
        isAuthenticated,
        isLoading,
        error,
        currentChat,
        messages,
        login: handleLogin,
        logout: handleLogout,
        setCurrentChat,
        sendMessage: handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};
