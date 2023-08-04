"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "";

const postSlice = createSlice({
  name: "postId",
  initialState,
  reducers: {
    choicePost: (state, action) => {
      return action.payload;
    },
    notChoicePost: () => {
      return initialState;
    },
  },
});
export const { choicePost, notChoicePost } = postSlice.actions;
export default postSlice.reducer;
