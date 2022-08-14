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

const teamSlice = createSlice({
  name: "team",
  initialState,

  extraReducers: {},
});
// export const { handleLeagueChange } = teamSlice.actions;
export default teamSlice.reducer;
