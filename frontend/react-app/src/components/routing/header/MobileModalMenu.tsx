import styled from "styled-components";
import { Link } from "react-router-dom";
import { Modal } from "../../core/Modal";

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderButton = styled(Link)`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.green};
  height: 50px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  text-decoration: underline;
  &:hover {
    background-color: ${({ theme }) => theme.colors.greenDark};
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

  return (
    <Modal onClose={toggleHamburgerModal} width="90%">
      <ButtonsWrapper>
        <HeaderButton to="/" onClick={toggleHamburgerModal}>
          Hjem
        </HeaderButton>
        <HeaderButton to="/minside" onClick={toggleHamburgerModal}>
          Min Side
        </HeaderButton>
      </ButtonsWrapper>
    </Modal>
  );
};
