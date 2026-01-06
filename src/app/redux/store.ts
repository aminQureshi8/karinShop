import { configureStore } from "@reduxjs/toolkit";
import menuMobile from "./slices/MenuMobile/MenuMobile";
import searchMobile from "./slices/SearchMobile/SearchMobile";

const store = configureStore({
  reducer: {
    menuMobile,
    searchMobile,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
