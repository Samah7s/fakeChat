import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 16px;
  background: ${theme.colors.error};
  color: #ffffff;
  border-radius: 8px;
  box-shadow: ${theme.shadows.base};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 4px;
`;
