import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamStats } from "../features/teamSlice";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";

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
const minuteLabels = [
  "0-15",
  "16-30",
  "31-45",
  "46-60",
  "61-75",
  "76-90",
  "91-105",
  "106-120",
];
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {},
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const TeamStats = ({ stats }) => {
  //GF
  const preGoalsFor = Array.from(Object.values(stats.goals.for.minute));
  const goalFor = preGoalsFor.map((goal) =>
    goal.total === null ? 0 : goal.total
  );

  //GA
  const preGoalsAgainst = Array.from(Object.values(stats.goals.against.minute));
  const goalAgainst = preGoalsAgainst.map((goal) =>
    goal.total === null ? 0 : goal.total
  );

  return (
    <div style={{ width: "70%" }}>
      <Bar
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
  );
};

export default TeamStats;
