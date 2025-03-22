import styled from "styled-components";
import { Modal } from "../core/Modal";
import { CameraScanner } from "./CameraScanner";

export const BarcodeScannerModal = ({ toggleModal }: any) => {
  // TODO set state for "option"

  // TODO: endre denne modalen
  // lag state for option ("manuell", "kamera")
  // vise to knapper:
  // [legg inn strekkkode manuelt] --> onclick --> rendrer kun inputfelt med knapp "scan"
  // [bruk kamera] --> onclick --> render <CameraScanner>

  // rendringen skal skje under knappene, så brukeren kan velge mellom kamera/inputfelt frem og tilbake

  return (
    <Modal onClose={toggleModal}>
      <CameraScanner toggleModal={toggleModal} />
    </Modal>
  );
};
