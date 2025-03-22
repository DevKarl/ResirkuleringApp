import { useState } from "react";
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

export const Login = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Heading>Logg inn</Heading>
      <form onSubmit={handleSubmit}>Form</form>
    </Container>
  );
};
