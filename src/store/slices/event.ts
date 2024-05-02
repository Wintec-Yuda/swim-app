import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    data: [],
  },
  reducers: {
    setEvent: (state, action) => {
      state.data = action.payload;
    },
    deleteEvent: (state, action) => {
      state.data = state.data.filter((event: any) => event.id !== action.payload);
    },

    addEvent: (state: any, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export const { setEvent, deleteEvent, addEvent } = eventSlice.actions;
export default eventSlice.reducer;
