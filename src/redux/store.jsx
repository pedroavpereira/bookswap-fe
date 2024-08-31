import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    rootReducer: rootReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export default store;
