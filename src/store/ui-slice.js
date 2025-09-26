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
    editBoardDetails: {
      label: ""
    }
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
    setEditBoardDetails: (state, action) => {
      state.editBoardDetails.label = action.payload;
    }
  },
});

export const { showBoardCard, closeBoardCard, setEditTaskCard, setEditBoardDetails } =
  uiSlice.actions;
export default uiSlice.reducer;
