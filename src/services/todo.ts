import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const ENDPOINT = process.env.NEXT_PUBLIC_API

export const todoApi = createApi({
  reducerPath: 'todoApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: ENDPOINT }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `todo`,
      providesTags: ["Todos"]
    }),
    addTodo: builder.mutation({
      query: (body) => ({
        url: 'todo',
        method: "POST",
        body
      }),
      invalidatesTags: ["Todos"]
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...patch }) => {
        return ({ url: `todo/${id}`, method: 'PATCH', body: patch })
      },
      invalidatesTags: ["Todos"]
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({ url: `todo/${id}`, method: "DELETE" }),
      invalidatesTags: ["Todos"]
    }),
    clearTodo: builder.mutation({
      query: (all) => ({ url: `todo/clear?all=${all}`, method: "DELETE" }),
      invalidatesTags: ["Todos"]
    }),
    analyzeTodo: builder.query({
      query: () => `todo/analyze`,
      providesTags: ["Todos"]
    })
  })
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useClearTodoMutation,
  useAnalyzeTodoQuery
} = todoApi