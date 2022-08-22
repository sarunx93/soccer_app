import { useEffect } from "react";
import {
  getLeagueStandings,
  handleLeagueChange,
} from "../features/leagueSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { handleTeamChange } from "../features/teamSlice";
const LeagueTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leagueStandings, isLoading, leagueId } = useSelector(
    (store) => store.league
  );
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  useEffect(() => {
    dispatch(getLeagueStandings());
  }, [leagueId]);
  const setTeamId = (id) => {
    return () => dispatch(handleTeamChange(id));
  };
  const setLeagueId = (id) => {
    return () => dispatch(handleLeagueChange(id));
  };

  //
  if (isLoading || !leagueStandings.standings) {
    return <h1>Loading...</h1>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <img src={leagueStandings.logo} className="league-logo" />
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "Mitr",
          fontSize: "24px",
          marginBottom: "1rem",
        }}
      >
        {leagueStandings.name}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="center">Matches Played</TableCell>
              <TableCell align="center">Win</TableCell>
              <TableCell align="center">Draw</TableCell>
              <TableCell align="center">Lose</TableCell>
              <TableCell align="center">Goal Diff</TableCell>
              <TableCell align="center">Points</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {leagueStandings.standings[0].map((row) => {
              const { rank, all, team, goalsDiff, points } = row;

              return (
                <TableRow key={team.id}>
                  <TableCell>{rank}</TableCell>

                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setTeamId(team.id);
                      setLeagueId(leagueStandings.id);
                      navigate(`/teams/${team.id}/${leagueStandings.id}`);
                    }}
                  >
                    <img src={row.team.logo} className="team-logo-table" />
                    {row.team.name}
                  </TableCell>

                  <TableCell align="center">{all.played}</TableCell>
                  <TableCell align="center">{all.win}</TableCell>
                  <TableCell align="center">{all.draw}</TableCell>
                  <TableCell align="center">{all.lose}</TableCell>
                  <TableCell align="center">{goalsDiff}</TableCell>
                  <TableCell align="center">{points}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};
//standings.all played (num of match), win, draw, lose
//goalsDiff
//rank
export default LeagueTable;
{
  /* <TableRow>
  <TableCell>{row.rank}</TableCell>

  <TableCell sx={{ display: "flex", alignItems: "center" }}>
    <img src={row.team.logo} className="team-logo-table" />
    {row.team.name}
  </TableCell>
</TableRow>; */
}
