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
    <div style={{ marginTop: "1.5rem" }}>
      {leagueInfo.map((league, id) => (
        <>
          <Button
            key={id}
            onClick={setLeagueId(league.id)}
            sx={{
              color: league.name === leagueName ? "#078500" : "#C7D3C7",
              fontFamily: "Russo One",
              fontWeight: "600",
              fontSize: "28px",
              marginRight: "2rem",

              borderRadius: "5%",
              "&:hover": {
                color: "#56A9B8",
                backgroundColor: "#EEF7EE",
              },
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
