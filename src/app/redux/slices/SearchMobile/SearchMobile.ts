import { createSlice } from "@reduxjs/toolkit";

const searchMobile = createSlice({
  name: "searchMobile",
  initialState: { isOpen: false },
  reducers: {
    openSearch: (state) => {
      state.isOpen = true;
    },
    closeSearch: (state) => {
      state.isOpen = false;
    },
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSearch, closeSearch, toggleMenu } = searchMobile.actions;
export default searchMobile.reducer;
