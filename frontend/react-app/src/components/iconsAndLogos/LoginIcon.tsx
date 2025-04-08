import styled, { css } from "styled-components";

const LoginStyles = css`
  color: ${({ theme }) => theme.colors.white};
`;

const LoginIconSvg = styled.svg`
  ${LoginStyles}
`;

export const LoginIcon = ({
  height = "25px",
  width = "25px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <LoginIconSvg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      id="Outlined"
    >
      <path d="M20,21V3H13a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1V22a1,1,0,0,1-1,1H13a1,1,0,0,1,0-2ZM2,12a1,1,0,0,0,1,1H14.586l-2.293,2.293a1,1,0,1,0,1.414,1.414l4-4a1,1,0,0,0,0-1.414l-4-4a1,1,0,1,0-1.414,1.414L14.586,11H3A1,1,0,0,0,2,12Z" />
    </LoginIconSvg>
  );
};
