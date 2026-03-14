import { createSlice } from "@reduxjs/toolkit";

const whishSlice = createSlice({
  name: "whish",
  initialState: [],
  reducers: {
    toggleWhish: (state : any, action : any) => {
      const index = state.findIndex((item : any) => item.id === action.payload.id);

      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }

      localStorage.setItem("whish", JSON.stringify(state));
    },

    setWhish: (_state, action) => {
      return action.payload;
    },
  },
});

export const { toggleWhish , setWhish } = whishSlice.actions;
export default whishSlice.reducer;
