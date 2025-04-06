import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CoreModal } from "../../core/CoreModal";
import { useAppContext } from "../../../context/ContextProvider";
import { usePostLogout } from "../../../hooks/API/usePostLogout";
import { CoreLoader } from "../../core/CoreLoader";
import { UserIcon } from "../../iconsAndLogos/UserIcon";
import { CoreContainer } from "../../core/CoreContainer";
import { LogoutIcon } from "../../iconsAndLogos/LogOutIcon";
import { AdminIcon } from "../../iconsAndLogos/AdminIcon";
import { HomeIcon } from "../../iconsAndLogos/HomeIcon";
import { LoginIcon } from "../../iconsAndLogos/LoginIcon";

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const HeaderLink = styled(Link)`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.green};
  height: 50px;
  border-radius: 15px;
  width: 200px;
  align-content: center;
  text-align: center;
  padding: 5px;
  border: 1px solid white;
  &:hover {
    background-color: ${({ theme }) => theme.colors.greenDark};
  }
`;

const HeaderLinkUserPage = styled(Link)`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.green};
  height: 50px;
  border-radius: 15px;
  width: 200px;
  align-content: center;
  text-align: center;
  justify-content: center;
  padding: 5px;
  border: 1px solid white;
  &:hover {
    background-color: ${({ theme }) => theme.colors.greenDark};
  }
`;

const ButtonLinkWrapper = css`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
  margin: 0 5px;
`;

const LogOutButton = styled.button`
  background-color: ${({ theme }) => theme.colors.greenDark};
  border: 1px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.greenWhite};
  font-size: 25px;
  text-decoration: none;
  height: 62px;
  border-radius: 15px;
  width: 212px;
  align-content: center;
  text-align: center;
  padding: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.green};
  }
`;

interface MobileNavProps {
  hamburgerModalOpen: boolean;
  toggleHamburgerModal: () => void;
}

export const MobileModalMenu = ({
  hamburgerModalOpen,
  toggleHamburgerModal,
}: MobileNavProps) => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { isLoading, postLogout } = usePostLogout();
  if (!hamburgerModalOpen) return null;

  const handleLogout = () => {
    postLogout();
    navigate("/");
    toggleHamburgerModal();
  };

  return (
    <CoreModal onClose={toggleHamburgerModal}>
      <ButtonsWrapper>
        <HeaderLink to="/" onClick={toggleHamburgerModal}>
          <CoreContainer styles={ButtonLinkWrapper}>
            <p>Hjem</p>
            <HomeIcon />
          </CoreContainer>
        </HeaderLink>
        {user && (
          <HeaderLinkUserPage to="/minside" onClick={toggleHamburgerModal}>
            <CoreContainer styles={ButtonLinkWrapper}>
              <p>Min Side</p>
              <UserIcon />
            </CoreContainer>
          </HeaderLinkUserPage>
        )}
        {user?.isAdmin && (
          <HeaderLink to="/admin" onClick={toggleHamburgerModal}>
            <CoreContainer styles={ButtonLinkWrapper}>
              <p>Admin</p>
              <AdminIcon />
            </CoreContainer>
          </HeaderLink>
        )}
        {user !== null ? (
          isLoading ? (
            <CoreLoader />
          ) : (
            <LogOutButton onClick={handleLogout}>
              <CoreContainer styles={ButtonLinkWrapper}>
                <p>Logg ut</p>
                <LogoutIcon />
              </CoreContainer>
            </LogOutButton>
          )
        ) : (
          <HeaderLink to="/logginn" onClick={toggleHamburgerModal}>
            <CoreContainer styles={ButtonLinkWrapper}>
              <p>Logg inn</p>
              <LoginIcon />
            </CoreContainer>
          </HeaderLink>
        )}
      </ButtonsWrapper>
    </CoreModal>
  );
};
