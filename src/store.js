import teamSlice from "./features/teamSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    team: teamSlice,
  },
});
