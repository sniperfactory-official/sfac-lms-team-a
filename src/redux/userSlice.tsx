"use client";
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface UserState {
  uid: string;
}

const initialState: UserState = { uid: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action) => {
      state.uid = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});
export const { update } = userSlice.actions;
export default userSlice.reducer;
