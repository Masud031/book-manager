import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../../src/types/types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,  
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    // Get all books
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    // Get book by ID
    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
       transformResponse: (response: { data: IBook }) => response.data,
    }),

    // Create new book
    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),

    // Edit book
    updateBook: builder.mutation<IBook, { id: string; updatedBook: Partial<IBook> }>({
      query: ({ id, updatedBook }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: updatedBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // Delete book
    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
