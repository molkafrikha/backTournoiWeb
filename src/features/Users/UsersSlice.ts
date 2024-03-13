import { apiSlice } from "../api/apiSlice";
import { User, Data, OneUser } from "./types";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, Omit<Data, "id" | "Role" | "name">>({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body: body,
      }),
    }),
    signup: builder.mutation<User, Omit<Data, "id" | "Role">>({
      query: (body) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: body,
      }),
    }),
    getUser: builder.query<OneUser, string>({
      query: (id) => ({
        url: `users/getUser/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useSignupMutation } =
  extendedApiSlice;
