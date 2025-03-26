import styled, { css } from "styled-components";
import { CoreModal } from "../core/CoreModal";
import { CameraScanner } from "./CameraScanner";
import { useFetchCoordsByBarcode } from "../../hooks/API/useFetchCoordsByBarcode";
import { useState, useRef } from "react";
import { CoreLoader } from "../core/CoreLoader";
import { CoreButton } from "../core/CoreButton";
import { CoreInput } from "../core/CoreInput";
import { CoreContainer } from "../core/CoreContainer";

const ErrorText = styled.p`
  font-size: 1.5rem;
  color: red;
`;

const MainContainer = css`
  gap: 25px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;
const OptionContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const OptionBtn = css`
  width: 100%;
  height: 100%;
`;

const CameraScannerContainer = css`
  position: relative;
  border-radius: 15px;
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
    <CoreModal onClose={toggleModal}>
      <CoreContainer styles={MainContainer}>
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
              placeholder="ingen mellomrom/spesialtegn)"
              error={inputError || ""}
              required
            />
            {isLoading ? (
              <CoreLoader />
            ) : (
              <CoreButton type="white" onClick={handleScanClick}>
                Scan avfall
              </CoreButton>
            )}
          </>
        )}
        {option === "kamera" && (
          <CoreContainer styles={CameraScannerContainer}>
            <CameraScanner
              toggleModal={toggleModal}
              barcodeScanned={barcodeScanned}
              fetchCoordsByBarcode={fetchCoordsByBarcode}
            />
          </CoreContainer>
        )}
      </CoreContainer>
    </CoreModal>
  );
};
