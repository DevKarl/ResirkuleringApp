import styled from "styled-components";
import { Modal } from "../core/Modal";
import { CameraScanner } from "./CameraScanner";
import { useFetchCoordsByBarcode } from "./useFetchCoordsByBarcode";
import { useRef } from "react";
import { Loader } from "../core/Loader";

const ResultText = styled.p`
  font-size: 1.5rem;
  color: white;
`;

const ErrorText = styled.p`
  font-size: 1.5rem;
  color: red;
`;

export const BarcodeScannerModal = ({ toggleModal }: any) => {
  const { error, isLoading, isSuccess, fetchCoordsByBarcode } =
    useFetchCoordsByBarcode();
  const barcodeScanned = useRef<string>(null);
  if (isSuccess) toggleModal();

  // TODO set state for "option"

  // TODO: endre innholdet i denne modalen
  // lag state for option ("manuell", "kamera")
  // lag state for barcodeInput
  // vise to knapper:
  // [legg inn strekkkode manuelt] --> onclick --> rendrer kun inputfelt med knapp "Scan avfall"
  // onChange på inputfelt skal endre på barcodeInput
  // ved klikk på Scan avfall: kall fetchCoordsByBarcode(barcodeInput)
  // husk å bruke core komponenter

  // [bruk kamera] --> onclick --> render <CameraScanner>

  // rendringen skal skje under knappene, så brukeren kan velge mellom kamera/inputfelt frem og tilbake

  return (
    <Modal onClose={toggleModal}>
      {isLoading && (
        <>
          <ResultText>Henter avfallsdata</ResultText> <Loader />
        </>
      )}
      {error && <ErrorText>{error}</ErrorText>}

      <CameraScanner
        toggleModal={toggleModal}
        barcodeScanned={barcodeScanned}
        fetchCoordsByBarcode={fetchCoordsByBarcode}
      />
    </Modal>
  );
};
