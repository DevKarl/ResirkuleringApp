import styled, { css } from "styled-components";
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

const MainContainer = css`
  gap: 25px;
  padding-left: 20px;
  padding-right: 20px;
`;
const OptionContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const OptionBtn = css`
  width: 100%;
  height: 100%;
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

  return (
    <CoreModal onClose={toggleModal} height="600px">
      <CoreContainer styles={MainContainer}>
        {isLoading && (
          <>
            <ResultText>Henter avfallsdata</ResultText> <CoreLoader />
          </>
        )}
        {error && <ErrorText>{error}</ErrorText>}
        <CoreContainer styles={OptionContainer}>
          <CoreButton
            type="white"
            onClick={() => setOption("kamera")}
            styles={OptionBtn}
          >
            Bruk kamera 🤳🏼
          </CoreButton>
          <CoreButton
            type="white"
            onClick={() => setOption("manuell")}
            styles={OptionBtn}
          >
            Skriv inn strekkode
          </CoreButton>
        </CoreContainer>
        {option === "manuell" && (
          <>
            <CoreInput
              label="Strekkode"
              name="barcode"
              type="text"
              version="secondary"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              placeholder="Skriv inn strekkkode"
              error={inputError || ""}
              required
            />
            <CoreButton type="white" onClick={handleScanClick}>
              Scan avfall
            </CoreButton>
          </>
        )}
        {option === "kamera" && (
          <CameraScanner
            toggleModal={toggleModal}
            barcodeScanned={barcodeScanned}
            fetchCoordsByBarcode={fetchCoordsByBarcode}
          />
        )}
      </CoreContainer>
    </CoreModal>
  );
};
