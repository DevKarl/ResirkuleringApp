import { useEffect, useState } from "react";
import { useGetAllUsers } from "../../../hooks/API/useGetAllUsers";
import { User } from "../../../types";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreLoader } from "../../core/CoreLoader";
import { CoreInput } from "../../core/CoreInput";
import { CoreButton } from "../../core/CoreButton";
import { EditIcon } from "../../iconsAndLogos/EditIcon";
import { DeleteIcon } from "../../iconsAndLogos/DeleteIcon";
import { ToggleAdminAccessModal } from "./ToggleAdminAccessModal";

const MainContainer = css`
  gap: 15px;
  border: 1px solid ${({ theme }) => theme.colors.green};
  padding: 20px;
  border-radius: 15px;
`;

const Entry = css`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.green};
  width: 100%;
  display: flex;
  border-radius: 15px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: 15px;
  margin: 10px;
  flex: 1;
`;

const ActionButtonsWrapper = css`
  flex-direction: row;
  width: 100%;
  gap: 0;
  flex: 1;
`;

const ActionButton = css`
  width: 100%;
  height: 100%;
`;

const ActionButtonContent = css`
  flex-direction: row;
  width: 100%;
  //border-top: 2px solid ${({ theme }) => theme.colors.white};
  padding: 5px 0;
`;

export const UsersContent = () => {
  const { isLoading, users, getAllUsers } = useGetAllUsers();
  const [searchInput, setSearchInput] = useState<string>("");
  const [userPickedForAction, setUserPickedForAction] = useState<User | null>(
    null
  );
  const [adminAccessModalOpen, setAdminAccessModalOpen] =
    useState<boolean>(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => await getAllUsers();

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filterByName = (user: User) => {
    const searchTerms = searchInput.trim().toLowerCase().split(" ");
    const searchEntries = [user.fornavn, user.etternavn, user.brukernavn];
    return searchTerms.every((term) =>
      searchEntries.some((entry) =>
        entry?.trim().toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleToggleAdminAccess = (user: User) => {
    setUserPickedForAction(user);
    setAdminAccessModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserPickedForAction(user);
    setDeleteUserModalOpen(true);
  };

  const getFilteredUsers = () => {
    return users?.filter((user) => filterByName(user));
  };

  return (
    <CoreContainer>
      {isLoading ? (
        <CoreLoader />
      ) : (
        <CoreContainer>
          <CoreInput
            name="users"
            type="text"
            version="secondary"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Søk etter brukeren"
          />
          {getFilteredUsers()?.map((user) => (
            <CoreContainer>
              <Title>{user.fornavn + " " + user.etternavn}</Title>
              <CoreContainer>
                <CoreButton
                  styles={ActionButton}
                  onClick={() => handleToggleAdminAccess(user)}
                >
                  <CoreContainer styles={ActionButtonContent}>
                    <EditIcon />
                  </CoreContainer>
                </CoreButton>
                <CoreButton
                  styles={ActionButton}
                  onClick={() => handleDeleteUser(user)}
                >
                  <CoreContainer styles={ActionButtonContent}>
                    <DeleteIcon />
                  </CoreContainer>
                </CoreButton>
              </CoreContainer>
            </CoreContainer>
          ))}
        </CoreContainer>
      )}
      {adminAccessModalOpen && (
        <ToggleAdminAccessModal
          toggleModal={() => setAdminAccessModalOpen(false)}
          fetchUsers={fetchAllUsers}
          user={userPickedForAction as User}
        />
      )}
      {deleteUserModalOpen && (
        <ToggleAdminAccessModal
          toggleModal={() => setAdminAccessModalOpen(false)}
          fetchUsers={fetchAllUsers}
          user={userPickedForAction as User}
        />
      )}
    </CoreContainer>
  );
};
