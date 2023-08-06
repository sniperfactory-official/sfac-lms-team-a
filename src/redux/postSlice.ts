"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { postId: string; type: string } = { postId: "", type: "" };

const postSlice = createSlice({
  name: "postInfo",
  initialState,
  reducers: {
    choicePost: (state, action) => {
      state.postId = action.payload.postId;
      state.type = action.payload.type;
    },
    notChoicePost: () => {
      return initialState;
    },
  },
});
export const { choicePost, notChoicePost } = postSlice.actions;
export default postSlice.reducer;
