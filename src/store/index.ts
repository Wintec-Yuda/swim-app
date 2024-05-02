import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./slices/event";
import athleteSlice from "./slices/athlete";
import teamSlice from "./slices/team";

export default configureStore({
  reducer: {
    event: eventSlice,
    team: teamSlice,
    athlete: athleteSlice,
  },
});
