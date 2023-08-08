"use client";
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { User } from "@/types/firebase.types";

const initialState: User = {
  id: "",
  email: "",
  username: "",
  role: "미정",
  profileImage: "",
  createdAt: null,
  updatedAt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.uid;
      state.email = action.payload.userData.email;
      state.username = action.payload.userData.username;
      state.role = action.payload.userData.role;
      state.profileImage = action.payload.userData.profileImage;
      state.createdAt = action.payload.userData.createdAt;
    },
    logoutUser: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
