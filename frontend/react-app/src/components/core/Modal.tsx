import { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  width?: string;
  height?: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const ModalContainer = styled.div<{
  $width?: string;
  $height?: string;
}>`
  background-color: ${({ theme }) => theme.colors.green};
  width: ${({ $width }) => $width || "100vw"};
  height: ${({ $height }) => $height || "500px"};
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 15px;
  border: 1.5px solid ${({ theme }) => theme.colors.greenBright};
`;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="40"
    height="40"
    viewBox="0 0 30 30"
  >
    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
  </svg>
);

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const Modal = ({ children, onClose, width, height }: ModalProps) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer
        $width={width}
        $height={height}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};
