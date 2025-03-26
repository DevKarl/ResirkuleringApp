import styled from "styled-components";
import { AvfallsIcon } from "../../iconsAndLogos/AvfallsIcon";
import { useAppContext } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePostLogin } from "../../API/usePostLogin";

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
  const { user } = useAppContext();

  // map over user.statistikk (eller hva vi får fra back)
  // for hver return <AvfallsIcon id={avfall.id} />

  return (
    <Container>
      <Heading>Min Side</Heading>
      <h3>Masse info om kunden bla bla bla</h3>
      <AvfallsIcon id={1} />
      <AvfallsIcon id={2} />
      <AvfallsIcon id={3} />
      <h3>Statistikk bla bla</h3>
      <h3>knapper for å endre kundedata ..</h3>
      <h3>hva mer? ..</h3>
    </Container>
  );
};
