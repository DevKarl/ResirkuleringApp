import { css } from "styled-components";
import { useGiveAdminPermissions } from "../../../hooks/API/useGiveAdminPermissions";
import { useRemoveAdminPermissions } from "../../../hooks/API/useRemoveAdminPermissions";
import { User } from "../../../types";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreModal } from "../../core/CoreModal";
import { CoreSubheading } from "../../core/CoreSubheading";
import { CoreLoader } from "../../core/CoreLoader";
import { ButtonType, CoreButton } from "../../core/CoreButton";

const MainContainer = css`
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

interface ToggleAdminAccessModalProps {
  user: User;
  fetchUsers: () => void;
  toggleModal: () => void;
}

export const ToggleAdminAccessModal = ({
  user,
  fetchUsers,
  toggleModal,
}: ToggleAdminAccessModalProps) => {
  const { isLoading: giveAdminLoading, giveAdminPermissions } =
    useGiveAdminPermissions();
  const { isLoading: removeAdminLoading, removeAdminPermissions } =
    useRemoveAdminPermissions();

  const finishAction = () => {
    toggleModal();
    fetchUsers();
  };

  const handleGiveAdminPermission = async () => {
    await giveAdminPermissions(user.id);
    finishAction();
  };

  const handleRemoveAdminPermission = async () => {
    await removeAdminPermissions(user.id);
    finishAction();
  };

  return (
    <CoreModal onClose={toggleModal}>
      <CoreContainer styles={MainContainer}>
        <CoreSubheading type="secondary" styles={CoreSubheadingStyles}>
          Er du sikker på at du vil {user?.isAdmin ? "fjerne " : "gi "}
          admintilgang til {user?.fornavn + " " + user.etternavn} ?
        </CoreSubheading>
        {giveAdminLoading || removeAdminLoading ? (
          <CoreLoader secondary />
        ) : user?.isAdmin ? (
          <CoreButton
            type={ButtonType.Danger}
            onClick={handleRemoveAdminPermission}
            styles={ButtonStyles}
          >
            Fjern admintilgang
          </CoreButton>
        ) : (
          <CoreButton
            type={ButtonType.Green}
            onClick={handleGiveAdminPermission}
            styles={ButtonStyles}
          >
            Gi admintilgang
          </CoreButton>
        )}
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
