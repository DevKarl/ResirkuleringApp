import { useRef } from "react";
import styled from "styled-components";
import Scanner from "./Scanner";
import { useFetchCoordsByBarcode } from "./useFetchCoordsByBarcode";
import { debounce } from "../../utils";
import { Loader } from "../core/Loader";
import { Modal } from "../core/Modal";

const ResultText = styled.p`
  font-size: 1.5rem;
  color: white;
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
    <Modal onClose={toggleModal}>
      {isLoading && (
        <>
          <ResultText>Henter avfallsdata</ResultText> <Loader />
        </>
      )}
      {error && <ResultText>{error}</ResultText>}
      <Scanner onDetected={onDetected} />
    </Modal>
  );
};
