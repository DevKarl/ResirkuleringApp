import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
`;

export const UserPage = () => {
  return (
    <Container>
      <Heading>Min Side</Heading>
      <h3>Masse info om kunden bla bla bla</h3>
      <h3>Statistikk bla bla</h3>
      <h3>knapper for å endre kundedata ..</h3>
      <h3>hva mer? ..</h3>
    </Container>
  );
};
