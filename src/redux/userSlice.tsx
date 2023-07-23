import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { uid: "" },
  reducers: {
    update: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { update } = userSlice.actions;
