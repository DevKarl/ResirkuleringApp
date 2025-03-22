import Scanner from "./Scanner";
import { debounce } from "../../utils";
import styled from "styled-components";

const ResultText = styled.p`
  font-size: 1.5rem;
  color: white;
`;

export const CameraScanner = ({
  fetchCoordsByBarcode,
  barcodeScanned,
}: any) => {
  const onDetected = debounce((barcode: string) => {
    if (barcode !== barcodeScanned.current) {
      barcodeScanned.current = barcode;
      fetchCoordsByBarcode(barcode);
    }
  }, 500);

  return (
    <>
      <Scanner onDetected={onDetected} />
    </>
  );
};
