import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTeams } from "../features/teamSlice";
import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
const Teams = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { team, isLoading, teamId } = useSelector((store) => store.team);
  useEffect(() => {
    dispatch(getTeams(id));
  }, []);

  if (!team[0] || isLoading) {
    return <h1>Loading...</h1>;
  }

  const LayoutContainer = styled("div")(() => ({
    height: "100vh",
    overflow: "hidden",
    width: "100%",
    padding: "3rem",
  }));

  console.log(team[0]);
  const { team: teamInfo, venue } = team[0];
  return (
    <Container maxWidth="xl">
      <LayoutContainer>
        <img src={teamInfo.logo} alt="" />

        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography variant="h5" component="h4" align="left">
              Team: {teamInfo.name}
            </Typography>
            <Typography variant="h6" component="h4" align="left">
              Country: {teamInfo.country}
            </Typography>
            <Typography variant="h6" component="h4">
              Founded: {teamInfo.founded}
            </Typography>
            <Typography variant="h4" component="h4">
              Stadium: {venue.name}
            </Typography>

            <Typography variant="h6" component="h4">
              City: {venue.city}
            </Typography>
            <Typography variant="h6" component="h4">
              Capacity: {venue.capacity}
            </Typography>
            <Typography variant="h6" component="h4">
              Surface:{" "}
              {venue.surface.charAt(0).toUpperCase() + venue.surface.slice(1)}
            </Typography>
          </Grid>

          <Grid item xs={6} justifyContent="center" alignItems="center">
            <img src={venue.image} alt="" className="stadium-pic" />
          </Grid>
        </Grid>
        <Link to="/">Home</Link>
      </LayoutContainer>
    </Container>
  );
};

export default Teams;
