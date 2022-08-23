import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTeams, getTeamStats } from "../features/teamSlice";
import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TeamStats from "../components/TeamStats";
import { styled, alpha } from "@mui/material/styles";
import {
  handleTeamChange,
  addToTeams,
  handleAlert,
} from "../features/teamSlice";
import { handleLeagueChange } from "../features/leagueSlice";
import Lineup from "../components/Lineup";
import PercentBar from "../components/PercentBar";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";

const LayoutContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  background: "#EEF7EE",
  // width: "auto",
  display: "flex",
  [theme.breakpoints.down("xl")]: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    height: "auto",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "25%",
  // height: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "100vh",
    borderRight: "none",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  borderRight: "2px solid grey",
}));
const ChartContainer = styled("div")(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  justifyContent: "center",

  [theme.breakpoints.down("md")]: {
    padding: 0,
    margin: 0,
    height: "100px",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const headingText = {
  fontFamily: "Russo One",
};
const spanText = {
  fontFamily: "Mitr",
  fontWeight: "100",
};

const displayButton = {
  // width: "30%",
  // padding: "30",
  height: 40,
  backgroundColor: "#EEBC1D",
  marginTop: 12,
  marginRight: 12,
  fontFamily: "Russo One",
};

const Teams = () => {
  const dispatch = useDispatch();
  const { id, league } = useParams();
  const { team, isLoading, user, stats } = useSelector((store) => store.team);
  let { watchList } = useSelector((store) => store.team);
  const [show, setShow] = useState("Goals");
  const addToWatchlist = async () => {
    //team[0].team.id
    const teamRef = doc(db, "watchList", user.uid);
    try {
      await setDoc(teamRef, {
        teams: watchList ? [...watchList, team[0].team] : [team[0].team],
      });
      dispatch(
        handleAlert({
          open: true,
          message: `${team[0].team.name} added to the watchlist`,
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
  const removeFromWatchlist = async () => {
    //team[0].team.id
    const teamRef = doc(db, "watchList", user.uid);
    try {
      await setDoc(teamRef, {
        teams: watchList.filter((list) => list.name !== team[0].team.name),
      });
      dispatch(
        handleAlert({
          open: true,
          message: `${team[0].team.name} removed to the watchlist`,
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

  useEffect(() => {
    dispatch(handleTeamChange(id));
    dispatch(handleLeagueChange(league));
    dispatch(getTeams());
    dispatch(getTeamStats());
  }, []);
  if (!team[0] || isLoading || !stats.goals) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  const { team: teamInfo, venue } = team[0];
  const { clean_sheet, penalty, goals } = stats;
  if (watchList === undefined) watchList = [];

  const inWatchList = watchList
    ?.map((list) => list.name)
    .includes(team[0].team.name);
  console.log(penalty);
  return (
    <>
      <LayoutContainer>
        <Sidebar>
          <img src={teamInfo.logo} alt="" className="team-logo-page" />
          <Typography variant="h4" component="h4" sx={headingText}>
            {teamInfo.name}
          </Typography>
          <Typography variant="h4" component="h4" sx={headingText}>
            {teamInfo.country}
          </Typography>
          <Typography variant="h4" component="h4" sx={headingText}>
            GF: <span style={spanText}>{goals.for.total.total}</span>
          </Typography>
          <Typography variant="h4" component="h4" sx={headingText}>
            GA: <span style={spanText}>{goals.against.total.total}</span>
          </Typography>
          {/* clean sheet */}
          <Typography variant="h4" component="h4" sx={headingText}>
            Clean Sheet: <span style={spanText}>{clean_sheet.total}</span>
          </Typography>
          {/* penalty scored */}

          <PercentBar
            percent={penalty.scored.percentage}
            scored={penalty.scored.total}
            missed={penalty.missed.total}
            total={penalty.total}
          />
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "50%",
                height: 40,
                backgroundColor: "#EEBC1D",
                marginTop: 8,
                fontFamily: "Russo One",
              }}
              onClick={inWatchList ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchList ? "Remove from watchList" : "Add to watchList"}
            </Button>
          )}
        </Sidebar>
        <ChartContainer>
          {show === "Goals" && <TeamStats stats={stats} />}

          {show === "Lineup" && <Lineup lineups={stats.lineups} />}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              paddingBottom: "2rem",
            }}
          >
            <Button
              variant="outlined"
              style={displayButton}
              onClick={() => setShow("Goals")}
            >
              Goals
            </Button>
            <Button
              variant="outlined"
              style={displayButton}
              onClick={() => setShow("Lineup")}
            >
              Lineup
            </Button>
          </div>
        </ChartContainer>
      </LayoutContainer>
    </>
  );
};

export default Teams;
