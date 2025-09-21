import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board-slice";
import newBoardReducer from "./add-new-board-slice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    newBoard: newBoardReducer,
  },
});

export default store;
