import SoccerLineUp from "react-soccer-lineup";
import React from "react";

const Lineup = ({ stats }) => {
  const { lineups } = stats;

  const formationArr = lineups[0].formation
    .split("-")
    .map((num) => parseInt(num));
  const dfArr = Array.from({ length: formationArr[0] }, () => {
    return new Object();
  });
  const cmArr = Array.from({ length: formationArr[1] }, () => {
    return new Object();
  });
  const camArr = Array.from({ length: formationArr[2] }, () => {
    return new Object();
  });
  const fwArr = Array.from({ length: formationArr[3] }, () => {
    return new Object();
  });

  let homeTeam = {
    squad: {
      df: dfArr.length === 0 ? [] : dfArr,
      cm: cmArr.length === 0 ? [] : cmArr,
      cam: camArr.length === 0 ? [] : camArr,
      fw: fwArr.length === 0 ? [] : camArr,
      gk: {},
    },
  };
  return (
    <div>
      <SoccerLineUp
        color={"lightseagreen"}
        pattern={"lines"}
        homeTeam={homeTeam}
      />
    </div>
  );
};

export default Lineup;
