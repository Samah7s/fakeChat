import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { FormContainer, Title, Input, Button } from "./PhoneInputStyles";
import { useError } from "../../context/ErrorContext";

const PhoneInput: React.FC = () => {
  const [phone, setPhone] = useState("");
  const { setCurrentChat, isLoading } = useChat();
  const { setError, clearError } = useError();

  const validatePhoneNumber = () => {
    if (!/^\d+$/.test(phone)) {
      setError({
        type: "validation",
        message: "Номер телефона должен содержать только цифры",
      });
      return false;
    } else if (phone.length < 11) {
      setError({
        type: "validation",
        message: "Неверный формат номера телефона",
      });
      return true;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validatePhoneNumber()) return;
    setCurrentChat(phone);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Введите номер получается</Title>
      <Input
        type="tel"
        placeholder="79991234567"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Начать чат"}
      </Button>
    </FormContainer>
  );
};

export default PhoneInput;
