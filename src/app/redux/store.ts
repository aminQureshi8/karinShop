import { configureStore } from "@reduxjs/toolkit";
import menuMobile from "./slices/MenuMobile/MenuMobile";
import searchMobile from "./slices/SearchMobile/SearchMobile";
import cart from "./slices/Cart/Cart";
import cartComputer from "./slices/CartComputer/CartComputer";
import whish from "./slices/Whish/Whish";
const store = configureStore({
  reducer: {
    menuMobile,
    searchMobile,
    cart,
    cartComputer,
    whish,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
