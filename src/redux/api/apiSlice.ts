/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IBookTypes } from '@/types/book';
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
        getSingleBook: builder.query({
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
        updateBook: builder.mutation({
            query: ({id, data}) =>({
                url: `/book/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["books"]
        }),
        deleteBook: builder.mutation({
            query: (id) =>({
                url: `/book/${id}`,
                method: "DELETE", 
            }),
            invalidatesTags: ["books"]
        }),
    })
})

export const {
    useGetBooksQuery,
    useGetSingleBookQuery, 
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = api;




