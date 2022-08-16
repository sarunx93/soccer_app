import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTeams } from "../features/teamSlice";
import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TeamStats from "../components/TeamStats";
import { styled, alpha } from "@mui/material/styles";
import { handleTeamChange } from "../features/teamSlice";
const LayoutContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  overflow: "hidden",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: "30%",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const Teams = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { team, isLoading, teamId } = useSelector((store) => store.team);
  useEffect(() => {
    dispatch(handleTeamChange(id));
    dispatch(getTeams(teamId));
  }, []);

  if (!team[0] || isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(teamId);
  console.log(team[0]);
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
        <Box
          sx={{
            width: "auto",
          }}
        >
          <TeamStats />
        </Box>
      </LayoutContainer>
    </Container>
  );
};

export default Teams;
