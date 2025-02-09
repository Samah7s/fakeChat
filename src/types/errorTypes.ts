export type ApiError = {
  type: "auth" | "send" | "receive" | "validation";
  message: string;
  code?: number;
  timestamp: number;
};

export type ErrorContextType = {
  error: ApiError | null;
  setError: (error: Omit<ApiError, "timestamp"> | null) => void;
  clearError: () => void;
};
