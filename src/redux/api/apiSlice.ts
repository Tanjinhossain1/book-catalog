/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl : "http://localhost:5000"}),
    tagTypes: [
        "books"
    ],
    endpoints: (builder) =>({
        getBooks : builder.query({
            query: () => `/books`, 
            providesTags: ["books"]
        }),
        singleBook: builder.query({
            query: (id: string) => `/book/${id}`
        }), 
        createBook: builder.mutation({
            query: (data) =>({
                url: `/book`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["books"]
        }),
    })
})

export const {
    useGetBooksQuery,
    useSingleBookQuery, 
    useCreateBookMutation,
} = api;



