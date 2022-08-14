import React from "react";
import LeagueTable from "../components/LeagueTable";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FilterButton from "../components/FilterButton";
const Home = () => {
  return (
    <Container>
      <FilterButton />
      <LeagueTable />
    </Container>
  );
};

export default Home;
