import Scanner from "./Scanner";
import { debounce } from "../../utils";

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
