import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import tagsService from "../api/tagsService";

const initialState = {
  kitchen: [],
  type: [],
  season: [],
  diet: [],
  main: [],
  course: [],
  message: "",
  isError: false,
};

export const getTags = createAsyncThunk("tags/get", async (_, thunkAPI) => {
  try {
    return await tagsService.httpGetTags();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.reponse.data.message) ||
      error.message ||
      error.toString();
    return message;
  }
});

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.fulfilled, (state, action) => {
        state.kitchen = action.payload.kitchen;
        state.type = action.payload.type;
        state.season = action.payload.season;
        state.diet = action.payload.diet;
        state.main = action.payload.main;
        state.course = action.payload.course;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.isError = false;
        state.message = action.payload;
      });
  },
});

export default tagsSlice.reducer;
