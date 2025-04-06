import { css } from "styled-components";
import { CoreButton } from "../core/CoreButton";
import { CoreContainer } from "../core/CoreContainer";
import { SearchIcon } from "../iconsAndLogos/SearchIcon";

const SearchUsersBtn = css`
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.colors.green};
`;

const SearchUsersInnerContainer = css`
  margin-bottom: 15px;
  height: 100%;
  flex-direction: row;
`;

interface SearchUsersButtonInterface {
  onClick: () => void;
}

export const SearchUsersButton = ({ onClick }: SearchUsersButtonInterface) => {
  return (
    <CoreButton styles={SearchUsersBtn} onClick={onClick}>
      <CoreContainer styles={SearchUsersInnerContainer}>
        <p>Vis andre brukere</p>
        <SearchIcon width="35px" height="35px" />
      </CoreContainer>
    </CoreButton>
  );
};
