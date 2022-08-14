import { useEffect } from "react";
import {
  getLeagueStandings,
  handleLeagueChange,
} from "../features/leagueSlice";
import { useDispatch, useSelector } from "react-redux";
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

const LeagueTable = () => {
  const dispatch = useDispatch();
  const { leagueStandings, isLoading, leagueId } = useSelector(
    (store) => store.league
  );
  useEffect(() => {
    dispatch(getLeagueStandings());
  }, [leagueId]);

  //
  if (isLoading || !leagueStandings.standings) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <img src={leagueStandings.logo} className="league-logo" />
      <Typography sx={{ textAlign: "center" }}>
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
                <TableRow>
                  <TableCell>{rank}</TableCell>
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
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
    </>
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
