import { useRef } from "react";
import styled from "styled-components";
import Scanner from "./Scanner";
import { useFetchCoordsByBarcode } from "./useFetchCoordsByBarcode";
import { debounce } from "../../utils";
import { Loader } from "../Loader";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Darker dimming effect for fullscreen */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const ModalContainer = styled.div`
  background-color: #628867;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 60px;
  right: 40px;
  font-size: 1.2rem;
  background-color: #a7baa9;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #628867;
  }
`;

const ResultText = styled.p`
  font-size: 1.5rem;
  color: white;
`;

const Button = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 50px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #a7baa9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #46694a;
  }
`;

export const BarcodeScannerModal = ({ isModalOpen, toggleModal }: any) => {
  const { error, isLoading, isSuccess, fetchCoordsByBarcode } =
    useFetchCoordsByBarcode();
  const barcodeScanned = useRef<string>(null);

  const onDetected = debounce((barcode: string) => {
    if (barcode !== barcodeScanned.current) {
      barcodeScanned.current = barcode;
      fetchCoordsByBarcode(barcode);
    }
  }, 500);

  if (!isModalOpen) return null;
  if (isSuccess) toggleModal();

  return (
    <ModalOverlay>
      <ModalContainer>
        {isLoading && (
          <>
            <ResultText>Henter avfallsdata</ResultText> <Loader />
          </>
        )}
        {error && <ResultText>{error}</ResultText>}
        <CloseButton onClick={toggleModal}>Lukk</CloseButton>
        <Scanner onDetected={onDetected} />
      </ModalContainer>
    </ModalOverlay>
  );
};
