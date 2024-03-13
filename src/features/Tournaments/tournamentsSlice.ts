import { apiSlice } from "../api/apiSlice";
import {
  Participants,
  SearchResults,
  SingleTournament,
  Tournament,
  tournaments,
} from "./types";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTournaments: builder.query<tournaments, void>({
      query: () => ({
        url: "/tournaments",
        method: "GET",
      }),
    }),
    search: builder.query<SearchResults, string>({
      query: (args) => ({
        url: `/tournaments/search/?search=${args}`,
        method: "GET",
      }),
    }),
    addNewTournament: builder.mutation({
      query: (body) => ({
        url: "/tournaments",
        method: "POST",
        body: body,
      }),
    }),
    joinTournament: builder.mutation({
      query: (args) => ({
        url: `tournaments/join/${args}`,
        method: "POST",
      }),
    }),
    getTournament: builder.query<SingleTournament, string>({
      query: (args) => ({
        url: `tournaments/${args}`,
        method: "GET",
      }),
    }),
    getParticipants: builder.query<Participants, string>({
      query: (args) => ({
        url: `tournaments/participants/${args}`,
        method: "GET",
      }),
    }),
    getTournamentsById: builder.query<tournaments, string>({
      query: (id) => ({
        url: `tournaments/users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTournamentsQuery,
  useSearchQuery,
  useAddNewTournamentMutation,
  useJoinTournamentMutation,
  useGetParticipantsQuery,
  useGetTournamentQuery,
  useGetTournamentsByIdQuery,
} = extendedApiSlice;
