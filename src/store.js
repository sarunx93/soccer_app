import teamSlice from "./features/teamSlice";
import leagueSlice from "./features/leagueSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    team: teamSlice,
    league: leagueSlice,
  },
});
