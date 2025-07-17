import { createSlice,} from "@reduxjs/toolkit";
import type { IBorrow } from "../../types/types";
import type {PayloadAction} from "@reduxjs/toolkit";

interface BorrowState {
  borrowedBooks: IBorrow[];
}

const initialState: BorrowState = {
  borrowedBooks: [],
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    addToBorrowSummary: (state, action: PayloadAction<IBorrow>) => {
      state.borrowedBooks.push(action.payload);
    },
    resetBorrowSummary: (state) => {
      state.borrowedBooks = [];
    },
  },
});


export const { addToBorrowSummary, resetBorrowSummary } = borrowSlice.actions;
export default borrowSlice.reducer;
