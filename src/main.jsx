import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext.jsx";
import { ErrorProvider } from "./context/ErrorContext.js";
import { GlobalStyle } from "./styles/index.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <ChatProvider>
          <GlobalStyle />
          <App />
        </ChatProvider>
      </ErrorProvider>
    </BrowserRouter>
  </StrictMode>
);
