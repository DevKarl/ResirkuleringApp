import { useState } from "react";
import styled from "styled-components";
import { BarcodeScannerModal } from "../../barcode-scanner/BarCodeScannerModal";
import { Map } from "../../map/Map";
import { Button } from "../../core/Button";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e2f0e5;
  gap: 10px;
`;

const Heading = styled.h1`
  font-size: 25px;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
`;

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <HomePageContainer>
      <Heading>Finn nærmeste avfallspunkt ♻️ </Heading>
      <Map />
      <Button onClick={() => setIsModalOpen(true)}>Scann avfall</Button>
      {isModalOpen && (
        <BarcodeScannerModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
    </HomePageContainer>
  );
};
