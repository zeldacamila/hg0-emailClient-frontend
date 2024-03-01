import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseType } from '../../types/common';
import { Mail } from '../../types/mail';
import { RootState } from '../../store';
const api_url = import.meta.env.VITE_REACT_APP_API_URL;
/**
 * An API slice that provides methods for interacting with the user endpoint.
 * Containt the reducerPath, baseQuery, and endpoints.
 * reducerPath: The name of the reducer that will be added to the store.
 * baseQuery: The default fetch function that will be used for all endpoints.
 * endpoints: An object containing the endpoints for the API.
 */
const mailApi = createApi({
  reducerPath: 'mailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${api_url}emails`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    allMails: builder.query<ResponseType<Mail[]>, string>({
      query: (subject) => ({
        url: `/list/all/?subject=${subject}`,
        method: 'GET',
      }),
    }),
    mailsByFolder: builder.query<ResponseType<Mail[]>, string>({
      query: (folder) => ({
        url: `/folders/${folder}/`,
        method: 'GET',
      }),
    }),
    mailsBySender: builder.query<ResponseType<Mail[]>, string>({
      query: (email) => ({
        url: `/list/sender/${email}/`,
        method: 'GET',
      }),
    }),
    mailsByRecipient: builder.query<ResponseType<Mail[]>, string>({
      query: (email) => ({
        url: `/list/recipient/${email}/`,
        method: 'GET',
      }),
    }),
    mailById: builder.query<ResponseType<Mail>, string>({
      query: (id) => ({
        url: `/detail/${id}/`,
        method: 'GET',
      }),
    }),
    deleteMail: builder.mutation<ResponseType<null>, number>({
      query: (id) => ({
        url: `/detail/${id}/`,
        method: 'DELETE',
      }),
    }),
    createMail: builder.mutation<ResponseType<Mail>, Partial<Mail>>({
      query: (body) => ({
        url: '/list/create/',
        method: 'POST',
        body,
      }),
    }),
    readMail: builder.mutation<ResponseType<Mail>, number>({
      query: (id) => ({
        url: `/status/read/${id}/`,
        method: 'PUT',
      }),
    }),
    addEmailToFolder: builder.mutation<ResponseType<Mail>, { email: number; folder: string }>({
      query: (body) => ({
        url: `/folders/`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default mailApi;

export const {
  useMailsBySenderQuery,
  useMailsByRecipientQuery,
  useMailByIdQuery,
  useCreateMailMutation,
  useReadMailMutation,
  useDeleteMailMutation,
  useAllMailsQuery,
  useAddEmailToFolderMutation,
  useMailsByFolderQuery,
} = mailApi;
