import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import AppBar from "./components/AppBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllTeams } from "./features/teamSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams/:id" element={<Teams />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
