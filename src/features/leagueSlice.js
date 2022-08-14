import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  leagueStandings: [],
  leagueId: "39",
  leagueName: "Premier League",
  isLoading: false,
  alert: {
    open: false,
    message: "",
    type: "success",
  },
  thisSeason: new Date().getFullYear().toString(),
  leagueInfo: [
    { name: "Premier League", id: "39" },
    { name: "Ligue 1", id: "61" },
    { name: "Bundesliga", id: "78" },
    { name: "Serie A", id: "135" },
    { name: "La Liga", id: "140" },
  ],
};
export const getLeagueStandings = createAsyncThunk(
  "league/getLeagueStandings",
  async (_, thunkAPI) => {
    const { leagueId, thisSeason } = thunkAPI.getState().league;

    let url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${thisSeason}&league=${leagueId}`;
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

const leagueSlice = createSlice({
  name: "league",
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
    [getLeagueStandings.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeagueStandings.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.leagueStandings = payload[0].league;
    },
    [getLeagueStandings.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
  },
});
export const { handleLeagueChange } = leagueSlice.actions;
export default leagueSlice.reducer;
