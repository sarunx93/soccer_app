import { useEffect } from "react";
import { Select, MenuItem, Typography } from "@mui/material";
import { handleLeagueChange, getAllTeams } from "../features/teamSlice";
import { useDispatch, useSelector } from "react-redux";
const AppBar = () => {
  const { teams, leagueId, leagueName, isLoading } = useSelector(
    (store) => store.team
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeams());
  }, [leagueId]);

  if (!teams[0]) {
    return <h1>Loading...</h1>;
  }
  console.log(teams[0].league.name);
  return (
    <>
      <Select
        varian="outlined"
        style={{ width: 100, height: 40, marginLeft: 15 }}
        value={leagueId}
        //   onChange={(e) => console.log(e.target.value)}
        onChange={(e) => dispatch(handleLeagueChange(e.target.value))}
      >
        <MenuItem value={"39"}>Premier League</MenuItem>
        <MenuItem value={"61"}>Ligue 1</MenuItem>
        <MenuItem value={"78"}>Bundesliga</MenuItem>
        <MenuItem value={"135"}>Serie A</MenuItem>
        <MenuItem value={"140"}>La Liga</MenuItem>
      </Select>
      <Typography variant="h1" component="h1">
        {leagueName}
      </Typography>
      <Typography variant="h1" component="h1">
        {leagueId}
      </Typography>
      <Typography variant="h1" component="h1">
        {teams[0]?.league.name}
      </Typography>
    </>
  );
};

export default AppBar;
