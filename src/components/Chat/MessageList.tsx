import React, { useEffect, useRef } from "react";
import { Message } from "../../context/authTypes";
import { MessageItem, MessagesContainer } from "./ChatStyles";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <MessagesContainer>
      {messages.map((message) => (
        <MessageItem key={message.id} isMy={message.isMy}>
          {message.text}
        </MessageItem>
      ))}
      <div ref={endRef} />
    </MessagesContainer>
  );
};

export default MessageList;
