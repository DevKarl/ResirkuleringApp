import styled, { keyframes } from "styled-components";

interface CoreLoaderProps {
  secondary?: boolean;
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const CoreLoader = styled.span<CoreLoaderProps>`
  width: 55px;
  height: 55px;
  border: 5px solid
    ${({ theme, secondary }) =>
      secondary ? theme.colors.white : theme.colors.greenDark};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
`;
