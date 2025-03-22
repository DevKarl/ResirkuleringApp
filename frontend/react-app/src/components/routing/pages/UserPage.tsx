import styled from "styled-components";
import { Elektronikk } from "../../../Ikoner/Elektronikk/Elektronikk"
import { Farligavfall } from "../../../Ikoner/FarligAvfall/FarligAvfall"
import { Glass } from "../../../Ikoner/Glass/Glass"
import { Matavfall } from "../../../Ikoner/Matavfall/Matavfall"
import { Metall } from "../../../Ikoner/Metall/Metall"
import { Papp } from "../../../Ikoner/Papp/Papp"
import { Plast } from "../../../Ikoner/Plast/Plast"
import { Restavfall } from "../../../Ikoner/Restavfall/Restavfall"
import { Tekstil } from "../../../Ikoner/Tekstil/Tekstil"
import { Treverk } from "../../../Ikoner/Treverk/Treverk"
import { PoengCoin } from "../../../Ikoner/PoengCoin/PoengCoin"
import { Recycle } from "../../../Ikoner/Recycle/Recycle"

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
      
        <Plast />
        <Metall />
        <Restavfall />
        <Papp />
        <Glass />
        <Matavfall />
        <Elektronikk />
        <Tekstil />
        <Farligavfall />
        <Treverk />
        <PoengCoin />
        <Recycle />
      
      <h3>Statistikk bla bla</h3>
      <h3>knapper for å endre kundedata ..</h3>
      <h3>hva mer? ..</h3>
    </Container>
  );
};
