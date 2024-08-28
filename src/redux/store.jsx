import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import rootReducer from "./reducers/rootReducer";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    rootReducer: rootReducer,
    loginReducer: loginReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export default store;
