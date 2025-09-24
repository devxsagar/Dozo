import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isBoardCardOpen: false,
    isTaskCardOpen: false,
    editTaskCard: {
      index: null,
      label: "",
    },
  },
  reducers: {
    showBoardCard: (state, action) => {
      state.isBoardCardOpen = action.payload;
    },
    closeBoardCard: (state, action) => {
      state.isBoardCardOpen = action.payload;
    },
    setEditTaskCard: (state, action) => {
      const { index, label } = action.payload;
      state.editTaskCard.index = index;
      state.editTaskCard.label = label;
    },
  },
});

export const { showBoardCard, closeBoardCard, setEditTaskCard } =
  uiSlice.actions;
export default uiSlice.reducer;
