import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import { signOut, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth, db } from "../firebase";
import { handleAlert } from "../features/teamSlice";
import { doc, setDoc } from "firebase/firestore";
import { handleTeamChange } from "../features/teamSlice";
import { handleLeagueChange } from "../features/leagueSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Montserrat",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "gold",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
});
const UserSiderbar = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    right: false,
  });
  const dispatch = useDispatch();
  const { user, teamId, watchList, team } = useSelector((store) => store.team);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logout = () => {
    signOut(auth);
    dispatch(
      handleAlert({
        open: true,
        type: "success",
        message: "Logout Successful",
      })
    );
    toggleDrawer();
  };
  const removeFromWatchlist = async (team) => {
    //team[0].team.id
    const teamRef = doc(db, "watchList", user.uid);
    try {
      await setDoc(teamRef, {
        teams: watchList.filter((list) => list.name !== team.name),
      });
      dispatch(
        handleAlert({
          open: true,
          message: `${team.name} removed to the watchlist`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        handleAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
    }
  };

  return (
    <>
      <Avatar
        onClick={toggleDrawer("right", true)}
        style={{
          height: 50,
          width: 50,
          marginLeft: 15,
          cursor: "pointer",
          backgroundColor: "white",
        }}
        src={user.photoURL}
        alt={user.displayName || user.email}
      />

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <div className={classes.container}>
          <div className={classes.profile}>
            <Avatar
              style={{
                width: "200px",
                height: "200px",
                cursor: "pointer",
                backgroundColor: "gold",
                objectFit: "contain",
              }}
              src={user.photoURL}
              alt={user.displayName || user.email}
            />
            <span
              style={{
                width: "100%",
                fontSize: 25,
                textAlign: "center",
                fontWeight: "bolder",
                wordWrap: "break-word",
              }}
            >
              {user.displayname || user.email}
            </span>
            <div className={classes.watchlist}>
              <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                {watchList.map((list) => {
                  return (
                    <div style={{ display: "flex" }}>
                      <Typography>{list.name}</Typography>

                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => removeFromWatchlist(list)}
                      >
                        delete
                      </span>
                    </div>
                  );
                })}
              </span>
            </div>
          </div>
          <Button
            variant="contained"
            className={classes.logout}
            onClick={logout}
            style={{
              height: "8%",
              width: "100%",
              backgroundColor: "gold",
              marginTop: 20,
            }}
          >
            Log Out
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default UserSiderbar;
