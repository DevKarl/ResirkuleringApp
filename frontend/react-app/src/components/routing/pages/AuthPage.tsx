import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
`;

export const AuthPage = () => {

  


  return (
    <Container>
      <Heading>Logg inn/registrer</Heading>
      <form></form>
    </Container>
  );



};
