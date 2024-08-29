import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import rootReducer from "./reducers/rootReducer";
import loginReducer from "./reducers/loginReducer";
import fetchBookCollectionReducer from "./reducers/fetchBookCollectionReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    rootReducer: rootReducer,
    login: loginReducer,
    bookCollection: fetchBookCollectionReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export default store;
