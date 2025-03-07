import styled from "styled-components";
import { Link } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dimming effect */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const MobileNavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: #628867;
  padding: 20px;
  border-radius: 15px;
  z-index: 1000;
  width: 200px;
  gap: 15px;
`;

const HeaderButton = styled(Link)`
  font-size: 25px;
  color: white;
  text-decoration: none;
  background-color: #628867;
  height: 50px;
  border-radius: 5px;
  border-bottom: 1px solid lightgrey;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  &:hover {
    background-color: #46694a;
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
  if (!hamburgerModalOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleHamburgerModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <MobileNavContainer>
        <HeaderButton to="/" onClick={toggleHamburgerModal}>
          Hjem
        </HeaderButton>
        <HeaderButton to="/minside" onClick={toggleHamburgerModal}>
          Min Side
        </HeaderButton>
      </MobileNavContainer>
    </Overlay>
  );
};
