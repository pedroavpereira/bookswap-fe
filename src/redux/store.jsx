import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export default store;
