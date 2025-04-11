import styled, { css, keyframes } from "styled-components";
import { ReactNode } from "react";

export enum ButtonType {
  Green = "green",
  GreenDark = "greenDark",
  White = "white",
  Danger = "danger",
}

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

const getButtonStyles = (type: ButtonType, theme: any) => {
  switch (type) {
    case ButtonType.GreenDark:
      return {
        backgroundColor: theme.colors.greenDark,
        color: theme.colors.white,
        hoverBackgroundColor: theme.colors.greenDarkHover,
      };
    case ButtonType.White:
      return {
        backgroundColor: theme.colors.greenWhite,
        color: theme.colors.greenDark,
        hoverBackgroundColor: theme.colors.greenWhiteHover,
      };
    case ButtonType.Danger:
      return {
        backgroundColor: theme.colors.danger,
        color: theme.colors.white,
        hoverBackgroundColor: theme.colors.dangerHover,
      };
    case ButtonType.Green:
    default:
      return {
        backgroundColor: theme.colors.green,
        color: theme.colors.white,
        hoverBackgroundColor: theme.colors.greenDark,
      };
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  width: 300px;
  max-width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 1.2rem;
  background-color: ${({ $type, theme }) =>
    getButtonStyles($type, theme).backgroundColor};
  color: ${({ $type, theme }) => getButtonStyles($type, theme).color};
  border: none;
  border-radius: 15px;

  &:hover {
    background-color: ${({ $type, theme }) =>
      getButtonStyles($type, theme).hoverBackgroundColor};
    cursor: pointer;
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
  type = ButtonType.Green,
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
