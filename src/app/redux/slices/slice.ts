import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" },
  reducers: {
    Dark: (state) => {},
    light: (state) => {},
  },
});
export const { Dark, light } = themeSlice.actions;
export default themeSlice.reducer;
