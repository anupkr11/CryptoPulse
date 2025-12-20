import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "./slices/marketSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    market: marketReducer,
    ui: uiReducer,
  },
});

export default store;
