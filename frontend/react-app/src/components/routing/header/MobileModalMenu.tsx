import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CoreModal } from "../../core/CoreModal";
import { useAppContext } from "../../../context/ContextProvider";
import { usePostLogout } from "../../../hooks/API/usePostLogout";
import { CoreLoader } from "../../core/CoreLoader";

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
          Hjem
        </HeaderLink>
        {user && (
          <HeaderLink to="/minside" onClick={toggleHamburgerModal}>
            Min Side
          </HeaderLink>
        )}
        {user !== null ? (
          isLoading ? (
            <CoreLoader />
          ) : (
            <LogOutButton onClick={handleLogout}>Logg ut</LogOutButton>
          )
        ) : (
          <HeaderLink to="/logginn" onClick={toggleHamburgerModal}>
            Logg inn
          </HeaderLink>
        )}
      </ButtonsWrapper>
    </CoreModal>
  );
};
