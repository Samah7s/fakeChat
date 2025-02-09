import styled from "styled-components";
import theme from "../../styles/theme";

export const FormContainer = styled.form`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: ${theme.shadows.base};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputField = styled.input`
  padding: 0.8rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 0.8rem;
  background: ${theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    background: ${theme.colors.disabled};
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  padding: 0.5rem;
  text-align: center;
`;
