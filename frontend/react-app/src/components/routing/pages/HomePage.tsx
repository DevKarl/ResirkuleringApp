import { useState } from "react";
import styled from "styled-components";
import { BarcodeScannerModal } from "../../barcode-scanner/BarCodeScannerModal";
import { Map } from "../../map/Map";
import { CoreButton } from "../../core/CoreButton";
import { useAppContext } from "../../../context/ContextProvider";
import { User } from "../../../types/userTypes";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e2f0e5;
  gap: 20px;
`;

const Heading = styled.h1`
  font-size: 25px;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const ScannedResultHeading = styled.h3`
  font-size: 18px;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
  width: 50%;
  margin: 0 5px;
  margin-top: 10px;
`;

const UserWelcome = styled.h3`
  font-size: 25px;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
  margin-bottom: 0;
`;

const Hilsen = ({ user }: any) => {
  const getGreeting = () => {
    const hour = new Date().getHours(); // Get current hour
    if (hour < 12 && hour > 6) {
      return "God morgen"; // Morning
    } else if (hour >= 12 && hour < 18) {
      return "God dag"; // Daytime
    } else if (hour >= 18 && hour < 22) {
      return "God ettermiddag"; // Evening
    } else {
      return "God kveld"; // Night
    }
  };

  const getEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12 && hour > 6) {
      return "☀️";
    } else if (hour >= 12 && hour < 18) {
      return "🌤️";
    } else if (hour >= 18 && hour < 22) {
      return "🌅";
    } else {
      return "🌙";
    }
  };

  const capitalizeFirstLetter = ({ name }: any) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    user && (
      <UserWelcome>
        {getGreeting()} {capitalizeFirstLetter(user.fornavn)} {getEmoji()}
      </UserWelcome>
    )
  );
};

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, scannedAvfallResult } = useAppContext();
  const scannedAvfall = scannedAvfallResult?.avfall.navn;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <HomePageContainer>
      {user && <Hilsen user={user} />}
      {scannedAvfall ? (
        <ScannedResultHeading>
          Viser avfallspunkter for {scannedAvfall} ⤵️
        </ScannedResultHeading>
      ) : (
        <Heading>Finn nærmeste avfallspunkt ♻️ </Heading>
      )}
      <Map />
      <CoreButton onClick={() => setIsModalOpen(true)}>Scann avfall</CoreButton>
      {isModalOpen && (
        <BarcodeScannerModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
    </HomePageContainer>
  );
};
