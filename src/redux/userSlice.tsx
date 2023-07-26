"use client";

import { login, logout } from "@/utils/firebase";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface UserState {
  uid: string;
}

const initialState: UserState = { uid: "" };

export const asyncLoginFetch = createAsyncThunk(
  "userSlice/asyncLoginFetch",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const uid = await login(data.email, data.password);
      return uid;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const asyncLogoutFetch = createAsyncThunk(
  "userSlice/asyncLogoutFetch",
  async () => {
    try {
      await logout();
    } catch (err: any) {
      return err;
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      asyncLoginFetch.fulfilled,
      (state, action: PayloadAction<string | undefined>) => {
        if (action.payload !== undefined) {
          state.uid = action.payload;
        }
      },
    );
    builder.addCase(asyncLogoutFetch.fulfilled, state => {
      state.uid = "";
    });
    builder.addCase(PURGE, () => initialState);
  },
});
export default userSlice.reducer;
