import { createSlice } from "@reduxjs/toolkit";


const addNewBoardSlice = createSlice({
    name: "newBoard",
    initialState: false,
    reducers: {
        showBoard: (state, action) => {
            return action.payload;
        },
        removeBoard: (state, action) => {
            return action.payload;
        }
    }
})

export const {showBoard, removeBoard} = addNewBoardSlice.actions;
export default addNewBoardSlice.reducer;