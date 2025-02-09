import React from "react";
import { useChat } from "../../context/ChatContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { ChatContainer } from "./ChatStyles";

const ChatWindow: React.FC = () => {
  const { currentChat, messages, sendMessage, isLoading } = useChat();
  return (
    <ChatContainer>
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} disabled={isLoading || !currentChat} />
    </ChatContainer>
  );
};

export default ChatWindow;
