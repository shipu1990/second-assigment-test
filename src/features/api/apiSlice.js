import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    tagTypes: ["todos", "todo"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => "/todos",
            keepUnusedDataFor:100,
            providesTags: ["todos"],
        }),
        getTodo: builder.query({
            query: (id) => `/todos/${id}`,
            providesTags: (result, error, arg) => [{ type: "todo", id: arg }],
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: "/todos",
                method: "POST",
                body: data,
            }),
            invalidatesTags:(result, error, arg) => [
            "Todos",
                { type: "todos", id: arg.id },
            ],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["todos"],
        }),
        editTodo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["todos"],
        }),
        updateTodoColor: builder.mutation({
            query: ({ id, data }) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["todos"],
        }),
       
        // getRelatedVideos: builder.query({
        //     query: ({ id, title }) => {
        //         const tags = title.split(" ");
        //         const likes = tags.map((tag) => `title_like=${tag}`);
        //         const queryString = `/videos?${likes.join("&")}&_limit=4`;
        //         return queryString;
        //     },
        //     providesTags: (result, error, arg) => [
        //         { type: "RelatedVideos", id: arg.id },
        //     ],
        // }),
        // addVideo: builder.mutation({
        //     query: (data) => ({
        //         url: "/videos",
        //         method: "POST",
        //         body: data,
        //     }),
        //     invalidatesTags: ["Videos"],
        // }),
        // editVideo: builder.mutation({
        //     query: ({ id, data }) => ({
        //         url: `/videos/${id}`,
        //         method: "PATCH",
        //         body: data,
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         "Videos",
        //         { type: "Video", id: arg.id },
        //         { type: "RelatedVideos", id: arg.id },
        //     ],
        // }),
        // deleteVideo: builder.mutation({
        //     query: (id) => ({
        //         url: `/videos/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["Videos"],
        // }),
    }),
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useEditTodoMutation,
    useUpdateTodoColorMutation,
} = apiSlice;
