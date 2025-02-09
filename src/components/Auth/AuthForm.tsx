import React, { useState } from "react";
import {
  FormContainer,
  InputField,
  SubmitButton,
  ErrorMessage,
} from "./AuthStyles";
import { useChat } from "../../context/ChatContext";
import { Credentials } from "../../types/authTypes";
import { useError } from "../../context/ErrorContext";

const AuthForm: React.FC = () => {
  const { setError, clearError } = useError();
  const { login, isLoading, error } = useChat();
  const [credentials, setCredentials] = useState<Credentials>({
    idInstance: "",
    apiTokenInstance: "",
  });

  // const validateCredentials = () => {
  //   const { idInstance, apiTokenInstance } = credentials;
  //   if (!idInstance || !apiTokenInstance) {
  //     setError({
  //       type: "validation",
  //       message: "Все полня обязательны для заполнения",
  //     });
  //     return false;
  //   }
  //   if (!/^\d+$/.test(idInstance)) {
  //     setError({
  //       type: "validation",
  //       message: "ID Instance должен содержать только цифры",
  //     });
  //     return false;
  //   }
  //   return true;
  // };

  const hadnleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    // if (!validateCredentials()) return;
    await login(credentials);
  };

  return (
    <FormContainer onSubmit={hadnleSubmit}>
      <h2>Green API AUTH</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputField
        type="text"
        placeholder="ID Instance"
        value={credentials.idInstance}
        onChange={(e) =>
          setCredentials((prev) => ({ ...prev, idInstance: e.target.value }))
        }
        disabled={isLoading}
      />
      <InputField
        type="password"
        placeholder="API Token"
        value={credentials.apiTokenInstance}
        onChange={(e) =>
          setCredentials((prev) => ({
            ...prev,
            apiTokenInstance: e.target.value,
          }))
        }
        disabled={isLoading}
      />
      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign in"}
      </SubmitButton>
    </FormContainer>
  );
};

export default AuthForm;
