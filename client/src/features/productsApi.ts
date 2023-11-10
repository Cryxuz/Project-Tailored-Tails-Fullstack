import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'items',
    }),
  }),
})

export const { useGetAllProductsQuery } = itemsApi