import React from "react";
import { useError } from "../../context/ErrorContext";
import { Container, CloseButton } from "./ErrorStyles";

const ErrorToast: React.FC = () => {
  const { error, clearError } = useError();
  return (
    <Container $visible={!!error}>
      <span>{error?.message}</span>
      <CloseButton onClick={clearError}>x</CloseButton>
    </Container>
  );
};

export default ErrorToast;
