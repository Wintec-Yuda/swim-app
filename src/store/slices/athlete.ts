import { createSlice } from "@reduxjs/toolkit";

const athleteSlice = createSlice({
  name: "athlete",
  initialState: {
    data: [],
  },
  reducers: {
    setAthlete: (state, action) => {
      state.data = action.payload;
    },
    deleteAthlete: (state, action) => {
      state.data = state.data.filter((event: any) => event._id !== action.payload);
    },
    addAthlete: (state: any, action) => {
      state.data = [...state.data, action.payload];
    },
    addAthleteEvent: (state: any, action) => {
      state.data = state.data.map((athlete: any) => {
        if (athlete._id === action.payload.athleteId) {
          return {
            ...athlete,
            event: action.payload.event,
          };
        }
        return athlete;
      });
    },
  },
});

export const { setAthlete, deleteAthlete, addAthlete, addAthleteEvent } = athleteSlice.actions;
export default athleteSlice.reducer;
