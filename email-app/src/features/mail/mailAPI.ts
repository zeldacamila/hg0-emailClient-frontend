import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseType } from '../../types/common';
import { Mail } from '../../types/mail';
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
    baseQuery: fetchBaseQuery({ baseUrl: `${api_url}emails` }),
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
        mailById: builder.query<ResponseType<Mail>, string>({
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
    }),
});

export default mailApi;

export const {
    useMailsBySenderQuery,
    useMailsByRecipientQuery,
    useMailByIdQuery,
    useCreateMailMutation,
} = mailApi;