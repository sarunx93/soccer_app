import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getLeagueFixtures } from "../features/leagueSlice";
const FixtureTable = () => {
  const dispatch = useDispatch();
  const { fixtures, leagueId, thisSeason } = useSelector(
    (store) => store.league
  );
  useEffect(() => {
    dispatch(getLeagueFixtures());
  }, [leagueId, thisSeason]);

  console.log(new Date(fixtures[0].fixture.date).getFullYear());
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
  console.log(thisWeek);

  return <div>FixtureTable</div>;
};

export default FixtureTable;
