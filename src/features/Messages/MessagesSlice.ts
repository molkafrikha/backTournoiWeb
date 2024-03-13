import { apiSlice } from "../api/apiSlice";
import { Data } from "./types";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<Data, void>({
      query: () => ({
        url: "/conversations",
      }),
    }),
    getConversation: builder.query({
      query: (id) => ({
        url: `/conversations/${id}`,
      }),
    }),
    getMessages: builder.query({
      query: (id) => ({
        url: `/messages/${id}`,
      }),
    }),
  }),
});

export const {
  useGetConversationQuery,
  useGetMessagesQuery,
  useGetConversationsQuery,
} = extendedApiSlice;
