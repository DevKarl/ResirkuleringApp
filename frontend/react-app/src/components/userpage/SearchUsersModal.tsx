import { useState } from "react";
import { CoreContainer } from "../core/CoreContainer";
import { CoreInput } from "../core/CoreInput";
import { CoreModal } from "../core/CoreModal";

export const SearchUsersModal = ({ toggleModal }) => {
  const [searchInput, setSearchInput] = useState("");
  const [hasInputError, setHasInputError] = useState<boolean>(false);

  const searchResults = "WIP";

  return (
    <CoreModal onClose={toggleModal}>
      <CoreContainer>
        <CoreInput
          label="Navn på bruker"
          name="users"
          type="text"
          version="secondary"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
