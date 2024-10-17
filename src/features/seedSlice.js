import { createSlice } from "@reduxjs/toolkit";

export const seedSlice = createSlice({
  name: "seed",
  initialState: {
    seeds: [],
  },
  reducers: {
    setSeeds: (state, action) => {
      state.seeds = action.payload;
    },
  },
});

export const { setSeeds } = seedSlice.actions;

export const selectSeeds = (state) => state.seed.seeds;

export default seedSlice.reducer;
