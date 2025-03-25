import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.greenDark};
  font-weight: 500;
  transition: color 0.3s ease;
`;

interface CoreLinkProps {
  to: string;
  children: React.ReactNode;
}

export const CoreLink = ({ children, to }: CoreLinkProps) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};
