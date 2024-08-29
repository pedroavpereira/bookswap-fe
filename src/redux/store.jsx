import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import rootReducer from "./reducers/rootReducer";

import fetchBookCollectionReducer from "./reducers/fetchBookCollectionReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    rootReducer: rootReducer,

    bookCollection: fetchBookCollectionReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export default store;
