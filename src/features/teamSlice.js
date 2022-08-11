import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { teamList } from "../config/apiCalls";
const initialState = {
  teams: [],
  leagueId: "39",
  leagueName: "Premier League",
  isLoading: false,
  alert: {
    open: false,
    message: "",
    type: "success",
  },
};

export const getAllTeams = createAsyncThunk(
  "team/getAllTeams",
  async (_, thunkAPI) => {
    const { leagueId } = thunkAPI.getState().team;
    const thisSeason = new Date().getFullYear().toString();
    let url = `https://api-football-v1.p.rapidapi.com/v3/leagues?id=${leagueId}`;
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
    handleLeagueChange: (state, { payload }) => {
      state.leagueId = payload;
      switch (state.leagueId) {
        case "39":
          state.leagueName = "Premier League";
          break;
        case "61":
          state.leagueName = "Ligue 1";
          break;
        case "78":
          state.leagueName = "Bundesliga";
          break;
        case "135":
          state.leagueName = "Serie A";
          break;
        case "140":
          state.leagueName = "La Liga";
          break;
        default:
          state.leagueName = "Premier League";
      }
    },
  },
  extraReducers: {
    [getAllTeams.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllTeams.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.teams = payload;
    },
    [getAllTeams.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
  },
});
export const { handleLeagueChange } = teamSlice.actions;
export default teamSlice.reducer;
