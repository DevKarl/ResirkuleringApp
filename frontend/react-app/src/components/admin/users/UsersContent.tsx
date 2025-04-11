import { useEffect, useState } from "react";
import { useGetAllUsers } from "../../../hooks/API/useGetAllUsers";
import { User } from "../../../types";
import { CoreContainer } from "../../core/CoreContainer";
import { CoreLoader } from "../../core/CoreLoader";
import { CoreInput } from "../../core/CoreInput";
import { CoreButton } from "../../core/CoreButton";
import { DeleteIcon } from "../../iconsAndLogos/DeleteIcon";
import { ToggleAdminAccessModal } from "./ToggleAdminAccessModal";
import styled, { css } from "styled-components";
import { DeleteUserModal } from "./DeleteUserModal";
import { RemoveAdminIcon } from "../../iconsAndLogos/RemoveAdminIcon";
import { AddAdminIcon } from "../../iconsAndLogos/AddAdminIcon";
import { AdminStarIcon } from "../../iconsAndLogos/AdminStar";
import { useAppContext } from "../../../context/ContextProvider";

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

const UserNameWrapper = css`
  flex: 1;
  flex-direction: row;
  margin-left: 15px;
`;

export const UsersContent = () => {
  const { user: mainUser } = useAppContext();
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

  const filterAwayMainUser = (user: User) => {
    return mainUser?.id !== user?.id;
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
    return users?.filter(
      (user) => filterByName(user) && filterAwayMainUser(user)
    );
  };

  return (
    <CoreContainer styles={MainContainer}>
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
            <CoreContainer key={user.id} styles={Entry}>
              <CoreContainer styles={UserNameWrapper}>
                {user.adminrettigheter && <AdminStarIcon />}
                <Title>{user.fornavn + " " + user.etternavn}</Title>
              </CoreContainer>
              <CoreContainer styles={ActionButtonsWrapper}>
                <CoreButton
                  styles={ActionButton}
                  onClick={() => handleToggleAdminAccess(user)}
                >
                  <CoreContainer styles={ActionButtonContent}>
                    {user.adminrettigheter ? (
                      <RemoveAdminIcon />
                    ) : (
                      <AddAdminIcon />
                    )}
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
        <DeleteUserModal
          toggleModal={() => setDeleteUserModalOpen(false)}
          fetchUsers={fetchAllUsers}
          user={userPickedForAction as User}
        />
      )}
    </CoreContainer>
  );
};
