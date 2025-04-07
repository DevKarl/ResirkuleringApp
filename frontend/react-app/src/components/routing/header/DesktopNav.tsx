import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/ContextProvider";
import { usePostLogout } from "../../../hooks/API/usePostLogout";
import { CoreLoader } from "../../core/CoreLoader";

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

const LogOutButton = styled.button`
  background-color: ${({ theme }) => theme.colors.greenDark};
  border: 1px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.greenWhite};
  font-size: 25px;
  text-decoration: none;
  border-radius: 15px;
  width: 212px;
  align-content: center;
  text-align: center;
  padding: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.greenBright};
    cursor: pointer;
  }
`;

export const DesktopNav = () => {
  const { user } = useAppContext();
  const { isLoading: logoutLoading, postLogout } = usePostLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    postLogout();
    navigate("/");
  };

  return (
    <DesktopNavContainer>
      <HeaderButton to="/">Hjem</HeaderButton>
      {!user && <HeaderButton to="/logginn">Logg inn</HeaderButton>}
      {user && (
        <>
          <HeaderButton to="/minside">Min Side</HeaderButton>
          {logoutLoading ? (
            <CoreLoader />
          ) : (
            <LogOutButton onClick={handleLogout}>Logg ut</LogOutButton>
          )}
        </>
      )}
    </DesktopNavContainer>
  );
};
