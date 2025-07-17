import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../features/book/bookApi";
import { borrowApi } from "../features/borrow/borrowApi";
import bookReducer from "../features/book/bookSlice";
import borrowReducer from "../features/borrow/borrowSlice"

// import { borrowApi } from "../features/borrow/borrowApi";
// import borrowReducer from "../features/borrow/borrowSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "@/redux/api/baseApi";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    book: bookReducer,
    borrow: borrowReducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
     [baseApi.reducerPath]: baseApi.reducer,

    // [borrowApi.reducerPath]: borrowApi.reducer,
    // borrow: borrowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
    bookApi.middleware,
    borrowApi.middleware,
    baseApi.middleware),
    // getDefaultMiddleware().concat(bookApi.middleware, borrowApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
