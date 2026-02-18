import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  color: string
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    setCart: (_state, action: PayloadAction<CartItem[]>) => {
      return action.payload;
    },
  },
});

export const { toggleCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
