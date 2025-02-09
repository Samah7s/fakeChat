import styled from "styled-components";
import theme from "../../styles/theme";

export const FormContainer = styled.form`
  max-width: 400px;
  margin: 2rem auto;
  padding: ${theme.spacing.large};
  background: #ffffff;
  border-radius: 8px;
  box-shadow: ${theme.shadows.base};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};
`;

export const Title = styled.h2`
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: ${theme.spacing.medium};
`;

export const Input = styled.input`
  padding: ${theme.spacing.small};
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

export const Button = styled.button`
  padding: ${theme.spacing.small};
  background: ${theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
  width: 100%;

  &:disabled {
    background: ${theme.colors.disabled};
    cursor: not-allowed;
  }
`;
