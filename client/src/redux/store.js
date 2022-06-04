import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import cookbooksReducer from "./cookbooksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cookbooks: cookbooksReducer,
  },
});
