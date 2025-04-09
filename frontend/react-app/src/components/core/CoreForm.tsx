import styled from "styled-components";

interface FormTitleProps {
  type: string;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 300px;
  border: 2px solid ${({ theme }) => theme.colors.greenBright};
  border-radius: 15px;
  padding: 20px;
`;

const StyledFormTitle = styled.p<FormTitleProps>`
  font-size: 22px;
  color: ${({ theme, type }) =>
    type === "primary" ? theme.colors.darkGrey : theme.colors.white};
`;

export const CoreForm = ({
  onSubmit,
  children,
  title,
  type = "primary",
}: any) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledFormTitle type={type}>{title}</StyledFormTitle>
      {children}
    </StyledForm>
  );
};
