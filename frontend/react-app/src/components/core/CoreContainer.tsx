import styled, { css } from "styled-components";

const baseStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const StyledCoreContainer = styled.div<{ styles?: any }>`
  ${baseStyles}
  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
`;

interface CoreContainerProps {
  children: React.ReactNode;
  styles?: any;
}

export const CoreContainer = ({ children, styles }: CoreContainerProps) => {
  return <StyledCoreContainer styles={styles}>{children}</StyledCoreContainer>;
};
