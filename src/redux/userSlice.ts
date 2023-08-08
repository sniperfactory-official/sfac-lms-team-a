"use client";
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

type User = {
  id: string,
  email: string,
  username: string,
  role: string,
  profileImage: string,
  createdAt: Timestamp| null,
  updatedAt:  Timestamp| null,
}

const initialState: User = {
  id: "",
  email: "",
  username: "",
  role: "",
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
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
});
export const { loginUser, logoutUser, updateProfileImage } = userSlice.actions;
export default userSlice.reducer;
