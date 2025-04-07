import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { CoreContainer } from "./CoreContainer";

interface CoreModalProps {
  children: ReactNode;
  onClose: () => void;
  styles?: any;
}

const ModalOverlay = styled.div<{
  styles?: React.CSSProperties;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
  max-height: 100vh;
`;

const CloseBtnContainer = css`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
`;

const ModalContainer = styled.div<{
  styles?: React.CSSProperties;
}>`
  background-color: ${({ theme }) => theme.colors.green};
  display: flex;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 15px;
  z-index: 1500;
  border: 1.5px solid ${({ theme }) => theme.colors.greenBright};
  ${({ styles }) => styles && { ...styles }};
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

const CloseButton = styled.button<{
  styles?: React.CSSProperties;
}>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 0;

  svg {
    fill: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const CoreModal = ({ children, onClose, styles }: CoreModalProps) => {
  return (
    <>
      <ModalContainer styles={styles} onClick={(e) => e.stopPropagation()}>
        <CoreContainer styles={CloseBtnContainer}>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </CoreContainer>
        {children}
      </ModalContainer>
      <ModalOverlay onClick={onClose} />
    </>
  );
};
