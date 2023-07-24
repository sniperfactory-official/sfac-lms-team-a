import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    userId: userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;