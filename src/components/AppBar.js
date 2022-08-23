import { useEffect } from "react";
import { AppBar, Typography, Container, Toolbar } from "@mui/material";
import { handleLeagueChange, getAllTeams } from "../features/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthModal from "./Auth/AuthModal";
import UserSiderbar from "./UserSiderbar";

const title = {
  textDecoration: "none",
  fontFamily: "Russo One",
  color: "#77EE79",
  fontSize: "2.75rem",
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
};

const NavBar = () => {
  //get user from slice
  const { user, watchList } = useSelector((store) => store.team);
  return (
    <AppBar color="primary" position="static" sx={{ background: "#687D79" }}>
      <Container>
        <Toolbar sx={navbar}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h4" sx={title}>
              Soccer App
            </Typography>
          </Link>
          {user ? <UserSiderbar /> : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
