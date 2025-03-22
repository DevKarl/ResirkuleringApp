import { useRef } from "react";
import Scanner from "./Scanner";
import { useFetchCoordsByBarcode } from "./useFetchCoordsByBarcode";
import { debounce } from "../../utils";
import { Loader } from "../core/Loader";
import styled from "styled-components";

const ResultText = styled.p`
  font-size: 1.5rem;
  color: white;
`;

export const CameraScanner = ({ toggleModal }: any) => {
  const { error, isLoading, isSuccess, fetchCoordsByBarcode } =
    useFetchCoordsByBarcode();
  const barcodeScanned = useRef<string>(null);

  const onDetected = debounce((barcode: string) => {
    if (barcode !== barcodeScanned.current) {
      barcodeScanned.current = barcode;
      fetchCoordsByBarcode(barcode);
    }
  }, 500);

  if (isSuccess) toggleModal();

  return (
    <>
      {isLoading && (
        <>
          <ResultText>Henter avfallsdata</ResultText> <Loader />
        </>
      )}
      {error && <ResultText>{error}</ResultText>}
      <Scanner onDetected={onDetected} />
    </>
  );
};
