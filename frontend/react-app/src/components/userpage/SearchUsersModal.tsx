import { useEffect, useState } from "react";
import { CoreContainer } from "../core/CoreContainer";
import { CoreInput } from "../core/CoreInput";
import { CoreModal } from "../core/CoreModal";
import { useGetSharedUsersStats } from "../../hooks/API/useGetAllSharedStats";
import { Stat } from "../../types/statTypes";
import { User } from "../../types";
import { CoreLoader } from "../core/CoreLoader";
import { CoreSubheading } from "../core/CoreSubheading";
import { CoreButton } from "../core/CoreButton";

interface SearchUserModalInterface {
  toggleModal: () => void;
  handleChangeActiveUserStats: (stats: Stat[], user: User) => void;
}

export const SearchUsersModal = ({
  toggleModal,
  handleChangeActiveUserStats,
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
    setSearchInput(e.target.value.trim());
  };

  const getFilteredStats = stats?.filter((stat) => stats.toLowerCase());

  const handlePickedUser = () => {
    // handleChangeActiveUserStats(); // set stats til user
  };

  return (
    <CoreModal onClose={toggleModal}>
      <CoreContainer>
        <CoreInput
          label="Søk etter bruker"
          name="users"
          type="text"
          version="secondary"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Skriv navn på brukeren"
          hasError={hasInputError}
        />
      </CoreContainer>
      <CoreContainer>
        TEST
        {/* {isLoading ? (
          <CoreLoader />
        ) : (
          getFilteredStats()?.map((stat) => (
            <CoreContainer>
              <CoreSubheading>{stat}</CoreSubheading>
              <CoreButton>Velg</CoreButton>
            </CoreContainer>
          ))
        )} */}
      </CoreContainer>
    </CoreModal>
  );
};
