import { createSlice } from "@reduxjs/toolkit";

const cartComputer = createSlice({
  name: "cartComputer",
  initialState: { isOpen: false },
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openCart, closeCart, toggleCart } = cartComputer.actions;
export default cartComputer.reducer;
