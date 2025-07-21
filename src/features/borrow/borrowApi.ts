import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBorrow } from "../../types/types";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,  // 
  }),
  tagTypes: ["Borrows"],
  endpoints: (builder) => ({
    // Get all borrow records
    getAllBorrows: builder.query<IBorrow[], void>({
      query: () => "/borrow",
      transformResponse: (response: { data: IBorrow[] }) => response.data,
      providesTags: ["Borrows"],
    }),

    // Borrow a book
    borrowBook: builder.mutation<IBorrow, Partial<IBorrow>>({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrows"],
    }),

    getBorrowStats: builder.query<
  { title: string; isbn: string; totalQuantity: number }[],
  void
>({
  query: () => "/borrow/stats", // route must match backend
}),

  }),
});

export const { useGetAllBorrowsQuery, 
    useGetBorrowStatsQuery,
  useBorrowBookMutation } = borrowApi;
