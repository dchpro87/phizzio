import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./services/apiSlice";
import userReducer from "./features/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
