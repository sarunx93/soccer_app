import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { startTransition } from "react";

const initialState = {
  team: [],
  teamId: "",
  teamName: "",
  isLoading: true,
  alert: {
    open: false,
    message: "",
    type: "success",
  },
  stats: {},
  displayGoalMinute: "For",
};

export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (id, thunkAPI) => {
    const { teamId } = thunkAPI.getState().team;
    const { leagueId } = thunkAPI.getState().league;
    console.log(leagueId);
    let url = `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamId}`;

    try {
      const resp = await axios.get(url, {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      });

      return resp.data.response;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getTeamStats = createAsyncThunk(
  "team/getTeamStats",
  async (_, thunkAPI) => {
    const { teamId } = thunkAPI.getState().team;
    const { leagueId, thisSeason } = thunkAPI.getState().league;
    console.log(leagueId, teamId, thisSeason);
    let url = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${leagueId}&season=${thisSeason}&team=${teamId}`;
    try {
      const resp = await axios.get(url, {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      });

      return resp.data.response;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    handleTeamChange: (state, { payload }) => {
      state.teamId = payload;
    },
  },

  extraReducers: {
    [getTeams.pending]: (state) => {
      state.isLoading = true;
    },
    [getTeams.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.team = payload;
      state.isLoading = false;
    },
    [getTeams.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
    [getTeamStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getTeamStats.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.stats = payload;
      state.isLoading = false;
    },
    [getTeamStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
  },
});
export const { handleTeamChange } = teamSlice.actions;
export default teamSlice.reducer;
