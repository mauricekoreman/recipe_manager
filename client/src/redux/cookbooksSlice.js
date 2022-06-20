import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import cookbooksService from "../api/cookbooksService";

const initialState = {
  cookbooks: [],
  currentCookbook: 0,
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
      });
  },
});

export const { reset, setCurrentCookbook } = cookbooksSlice.actions;
export default cookbooksSlice.reducer;
