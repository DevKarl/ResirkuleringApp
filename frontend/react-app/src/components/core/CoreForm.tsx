import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  width: 300px;
  border: 2px solid ${({ theme }) => theme.colors.greenBright};
  border-radius: 15px;
  padding: 20px;
`;

const StyledFormTitle = styled.p`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const CoreForm = ({ onSubmit, children, title }: any) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledFormTitle>{title}</StyledFormTitle>
      {children}
    </StyledForm>
  );
};
