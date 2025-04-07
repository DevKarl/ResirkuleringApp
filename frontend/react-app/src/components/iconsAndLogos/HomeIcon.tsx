import styled, { css } from "styled-components";

const HomeIconStyles = css`
  color: ${({ theme }) => theme.colors.white};
`;

const StyledHomeIcon = styled.svg`
  ${HomeIconStyles}
`;

export const HomeIcon = ({
  height = "35px",
  width = "35px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <StyledHomeIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"
        fill="currentColor"
      />
    </StyledHomeIcon>
  );
};
