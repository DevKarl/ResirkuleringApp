import styled from "styled-components";
import { Link } from "react-router-dom";

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

export const DesktopNav = () => (
  <DesktopNavContainer>
    <HeaderButton to="/">Hjem</HeaderButton>
    <HeaderButton to="/minside">Min Side</HeaderButton>
  </DesktopNavContainer>
);
