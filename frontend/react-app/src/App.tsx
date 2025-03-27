import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { HomePage } from "./components/routing/pages/HomePage";
import { UserPage } from "./components/routing/pages/UserPage";
import { Header } from "./components/routing/header/Header";
import { Login } from "./components/routing/pages/Login";
import { Registrer } from "./components/routing/pages/Register";
import { useEffect } from "react";
import { useGetUser } from "./hooks/API/useGetUser";

const MainContent = styled.main`
  background-color: #e2f0e5;
  height: 100%;
  overflow-y: scroll;
`;

function App() {
  const { getUser } = useGetUser();
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <MainContent>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/minside" element={<UserPage />} />
          <Route path="/logginn" element={<Login />} />
          <Route path="/registrer" element={<Registrer />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
