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
      {leagueInfo.map((league, id) => (
        <>
          <Button
            key={id}
            onClick={setLeagueId(league.id)}
            sx={{
              color: league.name === leagueName ? "red" : "blue",
              fontFamily: "Mitr",
              fontWeight: "600",
              fontSize: "28px",
              marginRight: "2rem",
            }}
          >
            {league.name}
          </Button>
        </>
      ))}
    </div>
  );
};

export default FilterButton;
