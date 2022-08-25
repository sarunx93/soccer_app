import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getLeagueFixtures } from "../features/leagueSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  TableBody,
  Pagination,
  Button,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import moment from "moment";
const FixtureTable = () => {
  const dispatch = useDispatch();
  const { fixtures, leagueId, thisSeason, isLoading } = useSelector(
    (store) => store.league
  );
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    width: "500px",
  });
  useEffect(() => {
    dispatch(getLeagueFixtures());
  }, [leagueId, thisSeason]);

  const getWeekNumber = (fixtureDate) => {
    const convertedFixtureDate = new Date(fixtureDate);

    const startDate = new Date(convertedFixtureDate.getFullYear(), 0, 1);
    const daysDifference = Math.floor(
      (fixtureDate - startDate) / (24 * 60 * 60 * 1000)
    );
    const weekNumber = Math.ceil(daysDifference / 7);
    return weekNumber;
  };

  const thisWeek = fixtures.filter(
    (fix) =>
      getWeekNumber(new Date(fix.fixture.date)) === getWeekNumber(new Date())
  );
  const sortedThisWeek = thisWeek.sort(
    (a, b) =>
      new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
  );
  console.log(sortedThisWeek);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <ThemeProvider theme={darkTheme}>
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "Russo One",
          fontSize: "40px",
          marginBottom: "1rem",
          color: "#1D836D",
        }}
      >
        This week matches
      </Typography>
      <Box sx={{ paddingTop: 0, paddingBottom: 4 }}>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 750, margin: "0 auto" }}
        >
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                maxWidth: "3px",
              },
            }}
          >
            <TableHead>
              <TableRow>
                {" "}
                <TableCell>Date</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Venue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedThisWeek.map((match, i) => {
                const { fixture, teams, goals } = match;
                return (
                  <TableRow key={i}>
                    <TableCell>
                      {moment(fixture.date).format("ll")}
                      <br></br>
                      {moment(fixture.date).format("LT")}
                    </TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",

                          marginBottom: "0.5rem",
                        }}
                      >
                        <img
                          src={teams.home.logo}
                          className="team-logo-table"
                        />
                        {teams.home.name} {goals.home === null ? 0 : goals.home}{" "}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={teams.away.logo}
                          className="team-logo-table"
                        />{" "}
                        {teams.away.name} {goals.away === null ? 0 : goals.away}
                      </div>
                    </TableCell>
                    <TableCell>{fixture.venue.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default FixtureTable;
