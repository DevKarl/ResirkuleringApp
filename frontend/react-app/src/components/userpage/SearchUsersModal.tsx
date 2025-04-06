import { useEffect, useState } from "react";
import { CoreContainer } from "../core/CoreContainer";
import { CoreInput } from "../core/CoreInput";
import { CoreModal } from "../core/CoreModal";
import { useGetSharedUsersStats } from "../../hooks/API/useGetAllSharedStats";
import { Stat } from "../../types/statTypes";
import { User } from "../../types";
import { CoreLoader } from "../core/CoreLoader";
import { CoreButton } from "../core/CoreButton";
import { css } from "styled-components";

interface SearchUserModalInterface {
  toggleModal: () => void;
  setSearchModalOpen: (prev: boolean) => void;
  handleChangeActiveUserStats: (stats: Stat[], user: User) => void;
  mainUser: User;
}

const UsersContainer = css`
  gap: 15px;
  margin-top: 15px;
`;

const UserEntry = css`
  flex-direction: row;
`;

const ButtonStyles = css`
  width: 100%;
`;

export const SearchUsersModal = ({
  toggleModal,
  mainUser,
  handleChangeActiveUserStats,
  setSearchModalOpen,
}: SearchUserModalInterface) => {
  const [searchInput, setSearchInput] = useState("");
  const [hasInputError, setHasInputError] = useState<boolean>(false);
  const {
    data: stats,
    isLoading,
    getSharedUsersStats,
  } = useGetSharedUsersStats();

  useEffect(() => {
    getSharedUsersStats();
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filterByFullName = (user: User) => {
    const searchTerms = searchInput.trim().toLowerCase().split(" ");
    const searchEntries = [user?.fornavn, user?.etternavn];
    return searchTerms.every((term) =>
      searchEntries.some((entry) =>
        entry?.trim().toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const filterAwayMainUser = (user: User) => {
    return mainUser?.id !== user?.id;
  };

  const getFilteredStats = () =>
    stats?.filter(
      (stat: Stat) =>
        filterByFullName(stat.bruker) && filterAwayMainUser(stat.bruker)
    );

  const handlePickedUser = (stat: any) => {
    handleChangeActiveUserStats(stat.avfallslogg, stat.bruker);
    setSearchModalOpen(false);
  };

  return (
    <CoreModal onClose={toggleModal}>
      <CoreInput
        label="Søk etter bruker"
        name="users"
        type="text"
        version="secondary"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Skriv navn på brukeren"
      />
      <CoreContainer styles={UsersContainer}>
        {isLoading ? (
          <CoreLoader />
        ) : (
          getFilteredStats()?.map((stat) => (
            <CoreContainer key={stat.bruker.id} styles={UserEntry}>
              <CoreButton
                type="white"
                styles={ButtonStyles}
                onClick={() => handlePickedUser(stat)}
              >
                {stat.bruker.fornavn + " " + stat.bruker.etternavn}
              </CoreButton>
            </CoreContainer>
          ))
        )}
      </CoreContainer>
    </CoreModal>
  );
};
