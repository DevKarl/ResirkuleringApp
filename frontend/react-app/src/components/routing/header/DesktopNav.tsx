import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/ContextProvider";
import { usePostLogout } from "../../../hooks/API/usePostLogout";
import { CoreLoader } from "../../core/CoreLoader";
import { CoreContainer } from "../../core/CoreContainer";
import { UserIcon } from "../../iconsAndLogos/UserIcon";
import { AdminIcon } from "../../iconsAndLogos/AdminIcon";
import { LogoutIcon } from "../../iconsAndLogos/LogOutIcon";
import { HomeIcon } from "../../iconsAndLogos/HomeIcon";
import { LoginIcon } from "../../iconsAndLogos/LoginIcon";

const DesktopNavContainer = styled.nav`
  display: flex;
  gap: 30px;
  margin-right: 60px;
  height: 100%;
`;

const HeaderButton = styled(Link)`
  font-size: 30px;
  color: white;
  text-decoration: none;
  background-color: #628867;
  border-radius: 15px;
  padding: 10px 20px;

  &:hover {
    background-color: #46694a;
  }
`;

const AdminBtn = styled(Link)`
  padding: 10px 20px;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.greenDark};
  border: 2px solid #f1f1f1;
  border-radius: 15px;
  &:hover {
    background-color: #2f4b33;
  }
`;

const ButtonLinkWrapper = css`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
  margin: 0 10px;
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
    background-color: #2f4b33;
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
      <HeaderButton to="/">
        <CoreContainer styles={ButtonLinkWrapper}>
          <p>Hjem</p>
          <HomeIcon />
        </CoreContainer>
      </HeaderButton>
      {!user && (
        <HeaderButton to="/logginn">
          <CoreContainer styles={ButtonLinkWrapper}>
            <p>Logg inn</p>
            <LoginIcon />
          </CoreContainer>
        </HeaderButton>
      )}
      {user && (
        <>
          <HeaderButton to="/minside">
            <CoreContainer styles={ButtonLinkWrapper}>
              <p>Min side</p>
              <UserIcon />
            </CoreContainer>
          </HeaderButton>
          {user?.isAdmin && (
            <AdminBtn to="/admin">
              <CoreContainer styles={ButtonLinkWrapper}>
                <p>Admin</p>
                <AdminIcon />
              </CoreContainer>
            </AdminBtn>
          )}
          {logoutLoading ? (
            <CoreLoader />
          ) : (
            <LogOutButton onClick={handleLogout}>
              <CoreContainer styles={ButtonLinkWrapper}>
                <p>Logg ut</p>
                <LogoutIcon />
              </CoreContainer>
            </LogOutButton>
          )}
        </>
      )}
    </DesktopNavContainer>
  );
};
