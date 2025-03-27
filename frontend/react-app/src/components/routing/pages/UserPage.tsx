import React from "react";
import styled from "styled-components";
import { AvfallsIcon } from "../../iconsAndLogos/AvfallsIcon";
import { useAppContext } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePostLogin } from "../../../hooks/API/usePostLogin";
import { CoreButton } from "../../core/CoreButton";

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

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StatEntry = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
`;

const InfoContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

type StatEntryType = {
  id: number;
  name: string;
  antall: number;
};

export const UserPage = () => {
  const { user } = useAppContext();

  // map over user.statistikk (eller hva vi får fra back)
  // for hver return <AvfallsIcon id={avfall.id} />

  {/*if (!user || !user.statistikk) {
    return (
      <Container>
        <h2>No user data available</h2>
      </Container>
    );
  } */}

  return (
    <Container>
      <Heading>Min Side</Heading>

      <InfoContainer>
        <h3>User Information</h3>
        <p>{`${user?.fornavn} ${user?.etternavn}`}</p>
      </InfoContainer> 

      <AvfallsIcon id={1} />
      <AvfallsIcon id={2} />
      <AvfallsIcon id={3} />
      <AvfallsIcon id={4} />

{/*      <StatsContainer>
        {user.statistikk?.map((entry: StatEntryType) => (
          <StatEntry key={entry.id}>
            <AvfallsIcon id={entry.id} />
            <span>{entry.name}</span>
            <span>({entry.antall})</span>
          </StatEntry>
        ))}
      </StatsContainer>*/}

      <CoreButton>Del min statistikk</CoreButton>
    </Container>
  );
};
