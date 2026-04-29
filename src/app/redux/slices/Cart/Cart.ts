import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  color: string;
  mainImage: string;
  count: number;
  mainCount: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    inCreaseCounter: (state, action) => {
      const item = state.find((cart) => cart.id === action.payload.id);

      if (item) {
        const oldCount = item.count;
        const unitPrice = item.price / oldCount;

        const newCount = action.payload.count;

        item.count = newCount;
        item.price = unitPrice * newCount;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    deCreaseCounter: (state, action) => {
      const item = state.find((cart) => cart.id === action.payload.id);

      if (item) {
        const oldCount = item.count;
        const unitPrice = item.price / oldCount;

        const newCount = action.payload.count;

        item.count = newCount;
        item.price = unitPrice * newCount;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    setCart: (_state, action: PayloadAction<CartItem[]>) => {
      return action.payload;
    },
  },
});

export const { toggleCart, setCart, inCreaseCounter, deCreaseCounter } =
  cartSlice.actions;
export default cartSlice.reducer;
