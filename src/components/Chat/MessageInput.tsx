import React, { useState } from "react";
import { Input, SendButton, InputContainer } from "./ChatStyles";

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          disabled={disabled}
        />
        <SendButton type="submit" disabled={disabled || !input.trim()}>
          Отправить
        </SendButton>
      </InputContainer>
    </form>
  );
};

export default MessageInput;
