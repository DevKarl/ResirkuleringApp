import styled, { css, keyframes } from "styled-components";
import { ReactNode } from "react";

type ButtonType = "green" | "white";

interface StyledButtonProps {
  $type: ButtonType;
  styles?: any;
  errorShake?: boolean;
}

const shake = keyframes`
  0% {
  margin-left: 0rem;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0rem;
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  width: 300px;
  max-width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 1.2rem;
  background-color: ${({ $type, theme }) =>
    $type === "white" ? theme.colors.greenWhite : theme.colors.green};
  color: ${({ theme, $type }) =>
    $type === "white" ? theme.colors.greenDark : theme.colors.white};
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: ${({ $type, theme }) =>
      $type === "white"
        ? theme.colors.greenWhiteHover
        : theme.colors.greenDark};
  }

  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}

  ${({ errorShake }) =>
    errorShake &&
    css`
      border: 2px solid red;
      animation: ${shake} 0.4s ease;
    `}
`;

interface ButtonProps {
  type?: ButtonType;
  onClick?: () => void;
  children?: ReactNode;
  styles?: any;
  errorShake?: boolean;
}

export const CoreButton = ({
  type = "green",
  onClick,
  children,
  styles,
  errorShake,
}: ButtonProps) => {
  return (
    <StyledButton
      $type={type}
      onClick={onClick}
      styles={styles}
      errorShake={errorShake}
    >
      {children}
    </StyledButton>
  );
};
