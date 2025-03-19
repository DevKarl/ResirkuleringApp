import { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../../context/ContextProvider";
import { BarcodeScannerModal } from "../../barcode-scanner/BarCodeScannerModal";
import { Map } from "../../map/Map";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e2f0e5;
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

const ScanResultButton = styled.button`
  margin-top: 20px;
  width: 300px;
  height: 60px;
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

const ResultText = styled.p`
  font-size: 1.5rem;
  color: #46694a;
`;

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const { scanProductResult } = useAppContext();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
//"9578545203541"
  const fetchScanAvfall = async () => {
    const strekkKode = "9578545203541";
    try {
      const response = await fetch(`/api/scanAvfall?strekkode=${strekkKode}`, { ///api/scanAvfall?strekkode=${strekkKode} ///api/getAvfallspunkterByAvfallstype?id=${id}
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setData(data);
    } catch (error) {
      console.error("Error fetching scan data:", error);
      return null;
    }
  };

  return (
    <HomePageContainer>
      <Heading>Finn nærmeste avfallspunkt ♻️ </Heading>
      <Map />
      {scanProductResult && (
        <>
          <ResultText>Fant avfalll med kode: {scanProductResult}</ResultText>
          <ScanResultButton>Vis nærmeste avfallspunkt på kart</ScanResultButton>
        </>
      )}
      <Button onClick={() => setIsModalOpen(true)}>Scann avfall</Button>
      <Button onClick={fetchScanAvfall}>Test hent data</Button>
      {data && (
        <>
          <ResultText>Fant avfalll med kode: {data.navn}</ResultText>
          <ResultText>Fant avfalll med kode: {data.beskrivelse}</ResultText>
          <ResultText>
            Fant avfalll med kode: {data.avfallsType.type}
          </ResultText>
        </>
      )}
      {isModalOpen && (
        <BarcodeScannerModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
    </HomePageContainer>
  );
};
