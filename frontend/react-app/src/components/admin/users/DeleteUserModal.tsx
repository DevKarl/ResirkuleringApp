import { css } from "styled-components";
import { User } from "../../../types";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreModal } from "../../core/CoreModal";
import { CoreSubheading } from "../../core/CoreSubheading";
import { CoreLoader } from "../../core/CoreLoader";
import { ButtonType, CoreButton } from "../../core/CoreButton";
import { useDeleteUser } from "../../../hooks/API/useDeleteUser";

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

interface DeleteUserModalProps {
  user: User;
  fetchUsers: () => void;
  toggleModal: () => void;
}

export const DeleteUserModal = ({
  user,
  fetchUsers,
  toggleModal,
}: DeleteUserModalProps) => {
  const { isLoading, deleteUser } = useDeleteUser();

  const handleDeleteUser = async () => {
    await deleteUser(user.id);
    toggleModal();
    fetchUsers();
  };

  return (
    <CoreModal onClose={toggleModal}>
      <CoreContainer styles={MainContainer}>
        <CoreSubheading type="secondary" styles={CoreSubheadingStyles}>
          Er du sikker på at du vil slette brukeren{" "}
          {user.fornavn + " " + user.etternavn} ?
        </CoreSubheading>
        {isLoading ? (
          <CoreLoader secondary />
        ) : (
          <CoreButton
            type={ButtonType.Danger}
            onClick={handleDeleteUser}
            styles={ButtonStyles}
          >
            Slett bruker
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
