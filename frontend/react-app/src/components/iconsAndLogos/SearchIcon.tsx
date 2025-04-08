import styled, { css } from "styled-components";

const SearchIconStyles = css`
  color: ${({ theme }) => theme.colors.white};
`;

const StyledSearchIcon = styled.svg`
  ${SearchIconStyles}
`;

export const SearchIcon = ({
  height = "50px",
  width = "50px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <StyledSearchIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSearchIcon>
  );
};
