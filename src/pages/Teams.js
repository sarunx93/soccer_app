import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTeams, getTeamStats } from "../features/teamSlice";
import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TeamStats from "../components/TeamStats";
import { styled, alpha } from "@mui/material/styles";
import { handleTeamChange } from "../features/teamSlice";
import Lineup from "../components/Lineup";
const LayoutContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  overflow: "hidden",
  width: "100%",
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "20%",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));
const ChartContainer = styled("div")(({ theme }) => ({
  width: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  justifyContent: "center",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const Teams = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { team, isLoading, teamId, stats } = useSelector((store) => store.team);

  useEffect(() => {
    dispatch(handleTeamChange(id));
    dispatch(getTeams());
    dispatch(getTeamStats());
  }, []);

  if (!team[0] || isLoading || !stats.goals) {
    return <h1>Loading...</h1>;
  }
  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }
  console.log(teamId);
  console.log(team[0]);
  // console.log(stats);
  const { team: teamInfo, venue } = team[0];
  return (
    <Container maxWidth="xl">
      <LayoutContainer>
        <Sidebar>
          <img src={teamInfo.logo} alt="" className="team-logo-page" />
          <Typography variant="h4" component="h4">
            {teamInfo.name}
          </Typography>
          <Typography variant="h4" component="h4">
            {teamInfo.country}
          </Typography>
          <Typography variant="h4" component="h4">
            {teamInfo.founded}
          </Typography>
        </Sidebar>
        <ChartContainer>
          <TeamStats stats={stats} />
          <Lineup stats={stats} />
        </ChartContainer>
      </LayoutContainer>
    </Container>
  );
};

export default Teams;
