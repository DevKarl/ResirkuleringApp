import styled from "styled-components";
import useBreakpoints from "../../../hooks/useBreakpoints";
import { useState } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileModalMenu } from "./MobileModalMenu";
import { AppLogo } from "../../iconsAndLogos/AppLogo";

const HeaderContainer = styled.header`
  background-color: #628867;
  padding: 20px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 30px;
  color: #fff;
  font-family: Arial, sans-serif;
  text-align: left;
  margin: 0;
`;

const Hamburger = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 50px;
  cursor: pointer;
  display: block;
  padding: 0;

  &:hover {
    color: #46694a;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
`;

export const Header = () => {
  const screenSize = useBreakpoints();
  const [hamburgerModalOpen, setHamburgerModalOpen] = useState(false);

  const toggleHamburgerModal = () =>
    setHamburgerModalOpen((prevState) => !prevState);

  return (
    <HeaderContainer>
      <LogoWrapper>
        <AppLogo />
        <Heading>ResirkulerApp</Heading>
      </LogoWrapper>
      {screenSize === "small" || screenSize === "medium" ? (
        <>
          <Hamburger onClick={toggleHamburgerModal}>&#9776;</Hamburger>
          <MobileModalMenu
            hamburgerModalOpen={hamburgerModalOpen}
            toggleHamburgerModal={toggleHamburgerModal}
          />
        </>
      ) : (
        <DesktopNav />
      )}
    </HeaderContainer>
  );
};
