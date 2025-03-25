import styled, { css } from "styled-components";
import { ReactNode } from "react";

type ButtonType = "green" | "white";

interface StyledButtonProps {
  $type: ButtonType;
  styles?: any;
}

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
`;

interface ButtonProps {
  type?: ButtonType;
  onClick?: () => void;
  children?: ReactNode;
  styles?: any;
}

export const CoreButton = ({
  type = "green",
  onClick,
  children,
  styles,
}: ButtonProps) => {
  return (
    <StyledButton $type={type} onClick={onClick} styles={styles}>
      {children}
    </StyledButton>
  );
};
