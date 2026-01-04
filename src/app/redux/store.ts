import { configureStore } from "@reduxjs/toolkit";
import menuMobile from "./slices/MenuMobile/MenuMobile";
const store = configureStore({
  reducer: {
    menuMobile,
  },
});

export default store;
