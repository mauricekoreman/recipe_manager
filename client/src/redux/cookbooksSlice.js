import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import cookbooksService from "../api/cookbooksService";

// Get cookbooks from localstorage
// const cookbooks = JSON.parse(localStorage.getItem("RECIPE_MANAGER_COOKBOOKS"));

const initialState = {
  cookbooks: [],
  currentCookbook: 0,
  currentCookbookRecipes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new cookbook
export const createCookbook = createAsyncThunk(
  "cookbooks/create",
  async (cookbookTitle, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cookbooksService.httpCreateCookbook(cookbookTitle, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Getting user cookbooks
export const getCookbooks = createAsyncThunk("cookbooks/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cookbooksService.httpGetCookbooks(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.reponse.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Add recipe to cookbook
export const addRecipeToCookbook = createAsyncThunk("cookbooks/path", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cookbooksService.httpAddRecipeToCookbook(data, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.reponse.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete cookbook
export const deleteCookbook = createAsyncThunk("cookbooks/delete", async (cookbookId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cookbooksService.httpDeleteCookbook(cookbookId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.reponse.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get recipes for currently selected cookbook
export const getCookbookRecipes = createAsyncThunk(
  "cookbooks/cookbookRecipes",
  async (cookbookId, thunkAPI) => {
    try {
      return await cookbooksService.httpGetCookbookRecipes(cookbookId);
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
export const getUserRecipes = createAsyncThunk("cookbooks/userRecipes/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await cookbooksService.httpGetUserRecipes(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.reponse.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const cookbooksSlice = createSlice({
  name: "cookbook",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    setCurrentCookbook: (state, action) => {
      state.currentCookbook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCookbook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCookbook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cookbooks.push(action.payload);
      })
      .addCase(createCookbook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCookbooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCookbooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cookbooks = action.payload;
      })
      .addCase(getCookbooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(addRecipeToCookbook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRecipeToCookbook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addRecipeToCookbook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCookbook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCookbook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cookbooks = state.cookbooks.filter((cookbook) => cookbook._id !== action.payload.id);
      })
      .addCase(deleteCookbook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      });
  },
});

export const { reset, setCurrentCookbook } = cookbooksSlice.actions;
export default cookbooksSlice.reducer;
