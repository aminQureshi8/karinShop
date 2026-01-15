import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      const item = action.payload;

      if (state.includes(item)) {
        state.splice(state.indexOf(item), 1);
      } else {
        state.push(item);
      }
    },
  },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
