import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { logout, setCredentials } from "../Users/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    console.log("sending refresh token ...");
    // send the refresh token to get new access Token
    const refreshResult = await baseQuery(
      "/users/refreshToken",
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (!refreshResult.data) {
      console.log("test interceptors: ", api.getState);
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(
        setCredentials({ accessToken: refreshResult?.data?.accessToken, user })
      );

      // retry the original query with new accessToken
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
