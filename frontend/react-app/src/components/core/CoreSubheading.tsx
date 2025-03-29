import styled from "styled-components";

const StyledSubheading = styled.h3`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.greenDark};
  font-family: Arial, sans-serif;
  text-align: left;
`;

export const CoreSubheading = ({ children }: any) => {
  return <StyledSubheading>{children}</StyledSubheading>;
};
