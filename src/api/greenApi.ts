import axios, { AxiosError } from "axios";
import { Credentials, Message } from "../types/authTypes";
import { ApiError } from "../types/errorTypes";

const getErrorType = (url?: string): ApiError["type"] => {
  if (url?.includes("getStateInstance")) return "auth";
  if (url?.includes("SendMessage")) return "send";
  if (url?.includes("ReceiveNotification")) return "receive";
  return "validation";
};

const createApiClient = (setError: (error: ApiError | null) => void) => {
  const instance = axios.create({
    baseURL: "api/",
    timeout: 5000,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const errorType = getErrorType(error.config?.url);
      const errorMessage = error.message || "Произошла незвестная ошибка";
      setError({
        type: errorType,
        message: errorMessage,
        code: error.response?.status,
        timestamp: Date.now(),
      });
      return Promise.reject(error);
    }
  );
  return instance;
};

export const createGreenApi = (setError: (error: ApiError | null) => void) => {
  const api = createApiClient(setError);
  return {
    checkAuth: async (creds: Credentials): Promise<boolean> => {
      const response = await api.get(
        `/waInstance${creds.idInstance}/getStateInstance/${creds.apiTokenInstance}`
      );
      return response.data.stateInstance === "authorized";
    },
    sendMessage: async (creds: Credentials, chatId: string, text: string) => {
      const response = await api.post(
        `/waInstance${creds.idInstance}/SendMessage/${creds.apiTokenInstance}`,
        {
          chatId: `${chatId}@c.us`,
          message: text,
        }
      );
      return response.data.idMessage;
    },
    receiveMessages: async (creds: Credentials): Promise<Message[]> => {
      const response = await api.get(
        `/waInstance${creds.idInstance}/receiveNotification/${creds.apiTokenInstance}`
      );
      if (!response.data) return [];
      const notification = response.data;
      const messages: Message[] = [];

      if (notification.body.typeWebhook === "incomingMessageReceived") {
        const msgData = notification.body.messageData;
        if (msgData.typeMessage === "textMessage") {
          messages.push({
            id: notification.body.idMessage,
            text: msgData.textMessageData.textMessage,
            isMy: false,
            timestamp: notification.body.timestamp.toString(),
          });
        }
      }
      await api.delete(
        `/waInstance${creds.idInstance}/deleteNotification/${creds.apiTokenInstance}/${notification.receiptId}`
      );
      return messages;
    },
  };
};
