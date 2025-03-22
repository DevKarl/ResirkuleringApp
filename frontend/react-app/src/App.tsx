import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { HomePage } from "./components/routing/pages/HomePage";
import { UserPage } from "./components/routing/pages/UserPage";
import { Header } from "./components/routing/header/Header";
import { AuthPage } from "./components/routing/pages/AuthPage";

const MainContent = styled.main`
  background-color: #e2f0e5;
  height: 100%;
`;

function App() {
  return (
    <Router>
      <MainContent>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/minside" element={<UserPage />} />
          <Route path="/logginn" element={<AuthPage />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
