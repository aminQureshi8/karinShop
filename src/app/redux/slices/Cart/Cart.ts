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

const getCartFromStorage = () => {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const initialState = getCartFromStorage() as CartItem[];

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
    },

    inCreaseCounter: (state, action: PayloadAction<string>) => {
      const item = state.find((cart) => cart.id === action.payload);
      if (item && item.count < item.mainCount) {
        item.count += 1;
      }
    },

    deCreaseCounter: (state, action: PayloadAction<string>) => {
      const item = state.find((cart) => cart.id === action.payload);
      if (!item) return;

      item.count > 1 ? item.count-- : state.splice(state.indexOf(item), 1);
    },

    setCart: (_state, action: PayloadAction<CartItem[]>) => {
      return action.payload;
    },
  },
});

export const { toggleCart, setCart, inCreaseCounter, deCreaseCounter } =
  cartSlice.actions;

export default cartSlice.reducer;
