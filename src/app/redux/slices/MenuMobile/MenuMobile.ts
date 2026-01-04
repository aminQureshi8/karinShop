import { createSlice } from "@reduxjs/toolkit";

const menuMobile = createSlice({
  name: "menuMobile",
  initialState: { isOpen: false },
  reducers: {
    openMenu: (state) => {
      state.isOpen = true;
    },
    closeMenu: (state) => {
      state.isOpen = true;
    },
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openMenu, closeMenu, toggleMenu } = menuMobile.actions;
export default menuMobile.reducer;
