import { Lecture } from "@/types/firebase.types";
import { createSlice } from "@reduxjs/toolkit";

interface listenLecture {
  nowPlayIndex: number;
  nowPlayLectureId: string;
  lectures: Lecture[];
  maxOrder: number;
}

const initialState: listenLecture = {
  nowPlayIndex: 0,
  nowPlayLectureId: "",
  maxOrder: 0,
  lectures: [],
};

const nowPlayLectureSlice = createSlice({
  name: "nowPlayLecture",
  initialState,
  reducers: {
    updatePlayLecture: (state, action) => {
      state.nowPlayIndex = action.payload.nowPlayIndex;
      state.nowPlayLectureId = action.payload.nowPlayLectureId;
    },
    initPlayLecture: (state, action) => {
      state.lectures = action.payload.lectures;
      state.maxOrder = action.payload.maxOrder;
    },
    nextPlayLecture: (state, action) => {
      state.nowPlayIndex = action.payload.nowPlayIndex;
      state.nowPlayLectureId = action.payload.id;
    },
    prevPlayLecture: (state, action) => {
      if (action.payload.nowPlayindex >= 0) {
        state.nowPlayIndex = action.payload.nowPlayindex;
        state.nowPlayLectureId = state.nowPlayLectureId = action.payload.id;
      }
    },
  },
});

export const {
  updatePlayLecture,
  nextPlayLecture,
  prevPlayLecture,
  initPlayLecture,
} = nowPlayLectureSlice.actions;
export default nowPlayLectureSlice.reducer;
