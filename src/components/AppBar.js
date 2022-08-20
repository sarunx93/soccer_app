import { useEffect } from "react";
import { AppBar, Typography, Container, Toolbar } from "@mui/material";
import { handleLeagueChange, getAllTeams } from "../features/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthModal from "./Auth/AuthModal";
const NavBar = () => {
  //get user from slice
  const { user, watchList } = useSelector((store) => store.team);
  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Link to="/">
            <Typography variant="h6">Soccer App</Typography>
          </Link>
          {user ? "logout" : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
