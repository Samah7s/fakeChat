import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import AuthForm from "./components/Auth/AuthForm";
import { useChat } from "./context/ChatContext";
import ChatWindow from "./components/Chat/ChatWindow";
import PhoneInput from "./components/PhoneInput/PhoneInput";
import Loader from "./components/common/Loader";
import ErrorToast from "./components/Error/ErrorToast";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, currentChat } = useChat();

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/") {
        navigate("/enter");
      }
    } else {
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Loader /> : <AuthForm />} />
        <Route
          path="/enter"
          element={
            isAuthenticated ? (
              currentChat ? (
                <ChatWindow />
              ) : (
                <PhoneInput />
              )
            ) : (
              <Loader />
            )
          }
        />
        <Route
          path="/chat"
          element={isAuthenticated && currentChat ? <ChatWindow /> : <Loader />}
        />
      </Routes>

      <ErrorToast />
    </>
  );
};

export default App;
