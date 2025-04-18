import styled, { css } from "styled-components";

const LogoutIconStyles = css`
  color: ${({ theme }) => theme.colors.white};
`;

const LogoutIconSvg = styled.svg`
  ${LogoutIconStyles}
`;

export const LogoutIcon = ({
  height = "25px",
  width = "25px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <LogoutIconSvg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="currentColor"
      id="Outlined"
    >
      <g id="Fill">
        <path d="M25,2H16V4h9a1,1,0,0,1,1,1V27a1,1,0,0,1-1,1H16v2h9a3,3,0,0,0,3-3V5A3,3,0,0,0,25,2Z" />
        <path d="M21.58,17V15H7l4-4L9.58,9.55l-5,5a2,2,0,0,0,0,2.83l5,5L11,21,7,17Z" />
      </g>
    </LogoutIconSvg>
  );
};
