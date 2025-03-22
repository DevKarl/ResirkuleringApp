import styled from "styled-components";

const Form = styled.form`
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

const FormTitle = styled.p`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const FormContainer = ({ onSubmit, children, title }: any) => {
  return (
    <Form onSubmit={onSubmit}>
      <FormTitle>{title}</FormTitle>
      {children}
    </Form>
  );
};
