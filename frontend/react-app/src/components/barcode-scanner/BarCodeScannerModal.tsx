import styled from "styled-components";
import { CoreModal } from "../core/CoreModal";
import { CameraScanner } from "./CameraScanner";
import { useFetchCoordsByBarcode } from "./useFetchCoordsByBarcode";
import { useState, useRef } from "react";
import { CoreLoader } from "../core/CoreLoader";
import { CoreButton } from "../core/CoreButton";
import { CoreInput } from "../core/CoreInput";
import { CoreContainer } from "../core/CoreContainer";

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
  const [option, setOption] = useState<"manuell" | "kamera" | null>(null);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  if (isSuccess) toggleModal();

  const handleScanClick = () => {
    if (!barcodeInput.trim()) {
      setInputError("Strekkode kan ikke være tom.");
      return;
    }
    setInputError(null);
    fetchCoordsByBarcode(barcodeInput);
  };
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
    <CoreModal onClose={toggleModal}>
      {isLoading && (
        <>
          <ResultText>Henter avfallsdata</ResultText> <CoreLoader />
        </>
      )}
      {error && <ErrorText>{error}</ErrorText>}
      
      
      <div>
      <CoreContainer>
            <CoreButton onClick={() => setOption("kamera")}>Bruk kamera</CoreButton>
            <CoreButton onClick={() => setOption("manuell")}>Legg inn strekkode manuelt</CoreButton>
      </CoreContainer>
      </div>
      
      
      {option === "manuell" && (
        <div>
          <CoreContainer>
          <CoreInput
            label="Strekkode"
            name="barcode"
            type="text"
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value)}
            placeholder="Skriv inn strekkkode"
            error={inputError || ""}
            required
          />
          <CoreButton onClick={handleScanClick}>Scan avfall</CoreButton>
          </CoreContainer>
        </div>
      )}
       {option === "kamera" && (
      <CameraScanner
        toggleModal={toggleModal}
        barcodeScanned={barcodeScanned}
        fetchCoordsByBarcode={fetchCoordsByBarcode}
      />
       )}
    </CoreModal>
  );
};
