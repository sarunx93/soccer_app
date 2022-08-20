import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import AppBar from "./components/AppBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllTeams } from "./features/teamSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./features/teamSlice";
import { auth } from "./firebase";
import Alert from "./components/Alert";
function App() {
  const dispatch = useDispatch();
  const { user, watchList } = useSelector((store) => store.team);
  useEffect(() => {
    onAuthStateChanged(auth, (myUser) => {
      if (myUser) {
        dispatch(setUser(myUser));
      } else {
        dispatch(setUser(null));
      }
      console.log(myUser);
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams/:id/:league" element={<Teams />} />
        </Routes>
      </BrowserRouter>
      <Alert />
    </div>
  );
}

export default App;
