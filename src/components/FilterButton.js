import { useEffect } from "react";
import { handleLeagueChange } from "../features/leagueSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import React from "react";

const FilterButton = () => {
  const dispatch = useDispatch();
  const { leagueInfo, leagueName } = useSelector((store) => store.league);
  const setLeagueId = (id) => {
    return () => dispatch(handleLeagueChange(id));
  };
  return (
    <div>
      {leagueInfo.map((league) => (
        <>
          <Button
            onClick={setLeagueId(league.id)}
            sx={{ color: league.name === leagueName ? "red" : "blue" }}
          >
            {league.name}
          </Button>
        </>
      ))}
    </div>
  );
};

export default FilterButton;
