import styled from "styled-components";
import theme from "../../styles/theme";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background: ${theme.colors.background};
  padding: ${theme.spacing.large};
`;

export const MessagesContainer = styled.div`
  flex: 1%;
  overflow-y: auto;
  padding: ${theme.spacing.medium};
  margin-bottom: ${theme.spacing.medium};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.small};
`;

export const MessageItem = styled.div<{ isMy: boolean }>`
  max-width: 70%;
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  border-radius: 12px;
  background: ${({ isMy }) => (isMy ? theme.colors.primary : "#ffffff")};
  color: ${({ isMy }) => (isMy ? "#ffffff" : theme.colors.text)};
  align-self: ${({ isMy }) => (isMy ? "flex-end" : "flex-start")};
  box-shadow: ${theme.shadows.base};
  word-break: break-word;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
  width: 100%;
`;

export const Input = styled.input`
  flex: 1;
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  border: 1px solid ${theme.colors.border};
  border-radius: 20px;
  font-size: 1rem;
`;

export const SendButton = styled.button`
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  background: ${theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    background: ${theme.colors.disabled};
    cursor: not-allowed;
  }
`;
