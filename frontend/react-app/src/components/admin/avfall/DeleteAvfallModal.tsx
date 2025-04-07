import { css } from "styled-components";
import { Avfall } from "../../../types";
import { ButtonType, CoreButton } from "../../core/CoreButton";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreModal } from "../../core/CoreModal";
import { CoreSubheading } from "../../core/CoreSubheading";

interface DeleteAvfallModalProps {
  avfall: Avfall | null;
  toggleModal: () => void;
  fetchAvfall: () => void;
}

const DeleteAvfallContainer = css`
  gap: 10px;
`;

export const DeleteAvfallModal = ({
  avfall,
  toggleModal,
  fetchAvfall,
}: DeleteAvfallModalProps) => {
  const handleDeleteAvfall = () => {
    // POSTDELETAVFALL
    toggleModal();
    fetchAvfall();
  };

  return (
    <CoreModal onClose={toggleModal}>
      <CoreContainer styles={DeleteAvfallContainer}>
        <CoreSubheading type="secondary">
          Er du sikker på at du vil slette {avfall?.navn} ?
        </CoreSubheading>
        <CoreButton type={ButtonType.Danger} onClick={handleDeleteAvfall}>
          Slett
        </CoreButton>
        <CoreButton type={ButtonType.White} onClick={toggleModal}>
          Lukk
        </CoreButton>
      </CoreContainer>
    </CoreModal>
  );
};
