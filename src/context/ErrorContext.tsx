import React, { createContext, useContext, useState } from "react";
import { ApiError, ErrorContextType } from "../types/errorTypes";

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setErrorState] = useState<ApiError | null>(null);

  const setError = (error: Omit<ApiError, "timestamp"> | null) => {
    if (!error) {
      setErrorState(null);
      return;
    }
    setErrorState({
      ...error,
      timestamp: Date.now(),
    });
  };

  const clearError = () => setErrorState(null);
  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error("useError must be used within ErrorProvider");
  return context;
};
