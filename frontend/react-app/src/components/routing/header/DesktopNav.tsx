import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/ContextProvider";

const DesktopNavContainer = styled.nav`
  display: flex;
  gap: 10px;
  margin-right: 60px;
`;

const HeaderButton = styled(Link)`
  padding: 10px 20px;
  font-size: 30px;
  color: white;
  text-decoration: none;
  background-color: #628867;
  border-radius: 5px;

  &:hover {
    background-color: #46694a;
  }
`;

export const DesktopNav = () => {
  const { user } = useAppContext();

  return (
    <DesktopNavContainer>
      <HeaderButton to="/">Hjem</HeaderButton>
      {!user && <HeaderButton to="/logginn">Logg inn</HeaderButton>}
      {user && <HeaderButton to="/minside">Min Side</HeaderButton>}
    </DesktopNavContainer>
  );
};
