import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseType } from '../../types/common';
import { Mail } from '../../types/mail';
import { RootState } from '../../store';
const api_url = 'http://localhost:8000/';
/**
 * An API slice that provides methods for interacting with the user endpoint.
 * Containt the reducerPath, baseQuery, and endpoints.
 * reducerPath: The name of the reducer that will be added to the store.
 * baseQuery: The default fetch function that will be used for all endpoints.
 * endpoints: An object containing the endpoints for the API.
 */
const mailApi = createApi({
    reducerPath: 'mailApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${api_url}emails`, prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
 }),
    endpoints: (builder) => ({
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
        mailById: builder.query<ResponseType<Mail>, number>({
            query: (id) => ({
                url: `/detail/${id}/`,
                method: 'GET',
            }),
        }),
        createMail: builder.mutation<ResponseType<Mail>, Partial<Mail>>({
            query: (body) => ({
                url: '/list/',
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
    }),
});

export default mailApi;

export const {
    useMailsBySenderQuery,
    useMailsByRecipientQuery,
    useMailByIdQuery,
    useCreateMailMutation,
    useReadMailMutation,
} = mailApi;