import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "../reducers/albumReducer";

export const store = configureStore({
  reducer: {
    album: albumReducer,
  },
});
