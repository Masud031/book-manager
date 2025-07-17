// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi', // Optional name for the reducer key in store

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // 🔁 Replace with your real API base URL
  }),

  endpoints: () => ({}), // Will be extended in feature slices
});
