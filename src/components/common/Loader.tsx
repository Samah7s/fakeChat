import React from "react";
import styled from "styled-components";
import theme from "../../styles//theme";

const Spinner = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.background};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader: React.FC = () => (
  <LoaderContainer>
    <Spinner />
  </LoaderContainer>
);

export default Loader;
