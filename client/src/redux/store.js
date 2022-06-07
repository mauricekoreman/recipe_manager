import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import cookbooksReducer from "./cookbooksSlice";
import tagsReducer from "./tagsSlice";
import recipesReducer from "./recipeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cookbooks: cookbooksReducer,
    tags: tagsReducer,
    recipes: recipesReducer,
  },
});
