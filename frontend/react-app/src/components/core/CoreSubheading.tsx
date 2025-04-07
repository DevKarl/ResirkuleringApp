import styled from "styled-components";

interface StyledSubheadingProps {
  type: string;
}

const StyledSubheading = styled.h3<StyledSubheadingProps>`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 20px;
  color: ${({ theme, type }) =>
    type === "secondary" ? theme.colors.white : theme.colors.greenDark};
  font-family: Arial, sans-serif;
  text-align: left;
`;

export const CoreSubheading = ({ children, type = "primary" }: any) => {
  return <StyledSubheading type={type}>{children}</StyledSubheading>;
};
