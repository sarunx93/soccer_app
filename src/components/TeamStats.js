import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamStats } from "../features/teamSlice";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { height } from "@mui/system";
const minuteLabels = [
  "0-15 mins",
  "16-30 mins",
  "31-45 mins",
  "46-60 mins",
  "61-75 mins",
  "76-90 mins",
  "91-105 mins",
  "106-120 mins",
];
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const title = {
  fontFamily: "Russo One",
};

let width = window.innerWidth;
export const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  plugins: {
    legend: {},
    title: {
      display: true,
    },
  },
  scales: {
    y: { ticks: { stepSize: 1 } },
  },
};

const TeamStats = ({ stats }) => {
  //GF
  const preGoalsFor = Array.from(Object.values(stats.goals.for.minute));
  const goalFor = preGoalsFor.map((goal) =>
    goal.total === null ? 0 : Math.ceil(goal.total)
  );

  //GA
  const preGoalsAgainst = Array.from(Object.values(stats.goals.against.minute));
  const goalAgainst = preGoalsAgainst.map((goal) =>
    goal.total === null ? 0 : Math.ceil(goal.total)
  );

  return (
    <>
      <div className="bar-chart">
        <Typography variant="h3" sx={title}>
          Goals by Minutes
        </Typography>
        <Bar
          options={options}
          data={{
            labels: minuteLabels,
            datasets: [
              { label: "GF", data: goalFor, backgroundColor: "green" },
              {
                label: "GA",
                data: goalAgainst,
                backgroundColor: "red",
              },
            ],
          }}
        />
      </div>
    </>
  );
};

export default TeamStats;
