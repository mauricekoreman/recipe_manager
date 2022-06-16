import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import recipeService from "../api/recipeService";

const initialState = {
  isError: false,
  isSuccess: false,
  deleteRecipeSuccess: false,
  isLoading: false,
  message: "",
};

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

    return await recipeService.httpUpdateRecipe(recipeData.data, recipeData.id, token);
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
      });
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
