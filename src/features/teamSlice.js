import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  team: [],
  teamId: "",
  teamName: "",
  isLoading: false,
  alert: {
    open: false,
    message: "",
    type: "success",
  },
};

export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (id, thunkAPI) => {
    const { teamId } = thunkAPI.getState().team;

    let url = `https://api-football-v1.p.rapidapi.com/v3/teams?id=${id}`;

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
      state.isLoading = false;
      state.team = payload;
    },
    [getTeams.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
  },
});
export const { handleTeamChange } = teamSlice.actions;
export default teamSlice.reducer;
