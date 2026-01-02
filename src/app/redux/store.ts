import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/slice";
const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});

export default store;
