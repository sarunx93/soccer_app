import SoccerLineUp from "react-soccer-lineup";
import React from "react";

const Lineup = ({ lineups }) => {
  const formationArr = lineups[0].formation
    .split("-")
    .map((num) => parseInt(num));

  const dfArr = Array.from({ length: formationArr[0] }, () => {
    if (formationArr[0].length === 0) {
      return [];
    }
    return new Object();
  });
  const cmArr = Array.from({ length: formationArr[1] }, () => {
    if (formationArr[1].length === 0) {
      return [];
    }
    return new Object();
  });
  const camArr = Array.from({ length: formationArr[2] }, () => {
    if (formationArr[2].length === 0) {
      return [];
    }
    return new Object();
  });
  const fwArr = Array.from({ length: formationArr[3] }, () => {
    if (formationArr[3].length === 0) {
      return [];
    }
    return new Object();
  });

  let homeTeam = {
    squad: {
      df: dfArr,
      cm: cmArr,
      cam: camArr,
      fw: fwArr,
      gk: {},
    },
  };
  if (lineups[0] === undefined) {
    return <h1>No lineup avaialble for this team.</h1>;
  }
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
