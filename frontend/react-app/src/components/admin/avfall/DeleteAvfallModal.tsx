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
  width: 250px;
  align-items: center;
`;

const ButtonStyles = css`
  font-size: 18px;
  width: 200px;
  margin-bottom: 15px;
`;

const CoreSubheadingStyles = css`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
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
        <CoreSubheading type="secondary" styles={CoreSubheadingStyles}>
          Er du sikker på at du vil slette {avfall?.navn} ?
        </CoreSubheading>
        <CoreButton
          type={ButtonType.Danger}
          onClick={handleDeleteAvfall}
          styles={ButtonStyles}
        >
          Slett
        </CoreButton>
        <CoreButton
          type={ButtonType.White}
          onClick={toggleModal}
          styles={ButtonStyles}
        >
          Lukk
        </CoreButton>
      </CoreContainer>
    </CoreModal>
  );
};
