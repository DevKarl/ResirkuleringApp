import { useState } from "react";
import { CoreContainer } from "../core/CoreContainer";
import { CoreInput } from "../core/CoreInput";
import { CoreModal } from "../core/CoreModal";
import { useGetAllSharedStats } from "../../hooks/API/useGetAllSharedStats";
import { Stat } from "../../types/statTypes";
import { User } from "../../types";

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
  const { data, isLoading } = useGetAllSharedStats();

  const seachSuggestions = "WIP";

  const handleSearch = (e) => {
    setSearchInput(e.target.value.trim());
  };

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
        <p>WIP</p>
      </CoreContainer>
    </CoreModal>
  );
};
