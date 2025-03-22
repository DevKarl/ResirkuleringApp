import styled from "styled-components";

const StyledCoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CoreContainer = ({ children }: any) => {
  return <StyledCoreContainer>{children}</StyledCoreContainer>;
};
