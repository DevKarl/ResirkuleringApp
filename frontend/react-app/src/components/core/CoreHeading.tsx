import styled from "styled-components";

const StyledHeading = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.greenDark};
  font-family: Arial, sans-serif;
  text-align: center;
`;

export const CoreHeading = ({ children }: any) => {
  return <StyledHeading>{children}</StyledHeading>;
};
