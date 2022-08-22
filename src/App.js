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
import { setUser, setWatchList } from "./features/teamSlice";
import { auth, db } from "./firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import Alert from "./components/Alert";
import UserSiderbar from "./components/UserSiderbar";
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

  useEffect(() => {
    if (user) {
      const teamRef = doc(db, "watchList", user.uid);
      var unsubscribe = onSnapshot(teamRef, (team) => {
        if (team.exists()) {
          dispatch(setWatchList(team.data().teams));
        } else {
          console.log("No item in the watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

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
