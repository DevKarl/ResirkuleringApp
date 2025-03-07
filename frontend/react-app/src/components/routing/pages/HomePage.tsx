import styled from "styled-components";
import { Map } from "../../map/Map";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
`;

const Heading = styled.h1`
  font-size: 25px;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 300px;
  height: 50px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #628867;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #46694a;
  }
`;

export const HomePage = () => {
  return (
    <HomePageContainer>
      <Heading>Finn nærmeste avfallspunkt ♻️ </Heading>
      <Map />
      <Button>Scan Avfall</Button>
    </HomePageContainer>
  );
};
