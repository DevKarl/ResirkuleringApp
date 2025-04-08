import styled, { css } from "styled-components";

interface StyledSubheadingProps {
  type: string;
  styles?: any;
}

const StyledSubheading = styled.h3<StyledSubheadingProps>`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 20px;
  color: ${({ theme, type }) =>
    type === "secondary" ? theme.colors.white : theme.colors.greenDark};
  font-family: Arial, sans-serif;
  text-align: left;

  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
`;

export const CoreSubheading = ({ children, type = "primary", styles }: any) => {
  return (
    <StyledSubheading type={type} styles={styles}>
      {children}
    </StyledSubheading>
  );
};
