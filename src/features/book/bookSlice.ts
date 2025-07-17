// src/features/books/bookSlice.ts
import { createSlice, } from "@reduxjs/toolkit";
import type { IBook } from "../../types/types";
import type {PayloadAction} from "@reduxjs/toolkit";

interface BookState {
  selectedBook: IBook | null;
}

const initialState: BookState = {
  selectedBook: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<IBook>) => {
      state.selectedBook = action.payload;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
});

export const { setSelectedBook, clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
