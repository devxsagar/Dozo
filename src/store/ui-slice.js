import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isBoardCardOpen: false,
    isTaskCardOpen: false,
  },
  reducers: {
    showBoardCard: (state, action) => {
      state.isBoardCardOpen = action.payload;
    },
    closeBoardCard: (state, action) => {
      state.isBoardCardOpen = action.payload;
    },
    showTaskCard: (state, action) => {
      state.isTaskCardOpen = action.payload;
    },
    closeTaskCard: (state, action) => {
      state.isTaskCardOpen = action.payload;
    },
  },
});

export const { showBoardCard, closeBoardCard, showTaskCard, closeTaskCard } = uiSlice.actions;
export default uiSlice.reducer;
