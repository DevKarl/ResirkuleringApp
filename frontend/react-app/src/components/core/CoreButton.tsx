import styled from "styled-components";
import { ReactNode } from "react";

type ButtonType = "green" | "white";

interface StyledButtonProps {
  $type: ButtonType;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 300px;
  height: 50px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: ${({ $type, theme }) =>
    $type === "white" ? theme.colors.greenWhite : theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: ${({ $type, theme }) =>
      $type === "white" ? "#8dab8c" : theme.colors.greenDark};
  }
`;

interface ButtonProps {
  type?: ButtonType;
  onClick?: () => void;
  children?: ReactNode;
}

export const CoreButton = ({
  type = "green",
  onClick,
  children,
}: ButtonProps) => {
  return (
    <StyledButton $type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
