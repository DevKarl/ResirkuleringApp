import styled, { css } from "styled-components";

const RemoveAdminIconStyles = css`
  color: ${({ theme }) => theme.colors.white};
`;

const RemoveAdminIconSvg = styled.svg`
  ${RemoveAdminIconStyles}
`;

export const RemoveAdminIcon = ({
  height = "25px",
  width = "25px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <RemoveAdminIconSvg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="currentColor"
      width={width}
      height={height}
      version="1.1"
      id="Layer_1"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      xmlSpace="preserve"
    >
      <path d="M384,256c-70.7,0-128,57.3-128,128s57.3,128,128,128c70.7,0,128-57.3,128-128S454.7,256,384,256z M469.3,405.3H298.7v-42.7  h170.7V405.3z M213.3,384c0-87,65.2-158.7,149.3-169.2c0-0.9,0-1.5,0-1.5c5.5-8,21.3-21.3,21.3-42.7s-21.3-42.7-21.3-53.3  C362.7,32,319.2,0,256,0c-60.5,0-106.7,32-106.7,117.3c0,10.7-21.3,32-21.3,53.3s15.2,35.4,21.3,42.7c0,0,0,21.3,10.7,53.3  c0,10.7,21.3,21.3,32,32c0,10.7,0,21.3-10.7,42.7L64,362.7C21.3,373.3,0,448,0,512h271.4C235.9,480.7,213.3,435,213.3,384z" />
    </RemoveAdminIconSvg>
  );
};
