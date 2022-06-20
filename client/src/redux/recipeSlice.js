import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import recipeService from "../api/recipeService";

const initialState = {
  currentCookbookRecipes: [],
  isError: false,
  isSuccess: false,
  deleteRecipeSuccess: false,
  isLoading: false,
  message: "",
};

// Get recipes for currently selected cookbook
export const getCookbookRecipes = createAsyncThunk(
  "recipes/GetCookbookRecipes",
  async (cookbookId, thunkAPI) => {
    try {
      return await recipeService.httpGetCookbookRecipes(cookbookId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get cookbook specific filtered recipes
export const getCookbookFilteredRecipes = createAsyncThunk(
  "recipes/cookbook/filtered",
  async ({ tags, cookbookId }, thunkAPI) => {
    try {
      return await recipeService.httpGetCookbookFilteredRecipes(tags, cookbookId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all the current user's recipes
export const getUserRecipes = createAsyncThunk("recipes/GetUserRecipes", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await recipeService.httpGetUserRecipes(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.reponse.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Get all user's filtered recipes
export const getUserFilteredRecipes = createAsyncThunk(
  "recipes/user/filtered",
  async (tags, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.httpUserGetFilteredRecipes(tags, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new recipe
export const createRecipe = createAsyncThunk("recipes/create", async (recipeData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await recipeService.httpCreateRecipe(recipeData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.reponse.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Update recipe
export const updateRecipe = createAsyncThunk("recipes/update", async (recipeData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await recipeService.httpUpdateRecipe(recipeData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.reponse.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Delete recipe
export const deleteRecipe = createAsyncThunk("recipes/delete", async (recipeId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;

    return await recipeService.httpDeleteRecipe(recipeId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.reponse.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.deleteRecipeSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCookbookRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCookbookRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentCookbookRecipes = action.payload;
      })
      .addCase(getCookbookRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentCookbookRecipes = action.payload;
      })
      .addCase(getUserRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRecipe.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Recipe updated!";
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecipe.fulfilled, (state) => {
        state.isLoading = false;
        state.deleteRecipeSuccess = true;
        state.message = "Recipe deleted!";
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserFilteredRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserFilteredRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentCookbookRecipes = action.payload;
      })
      .addCase(getUserFilteredRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCookbookFilteredRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCookbookFilteredRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentCookbookRecipes = action.payload;
      })
      .addCase(getCookbookFilteredRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
