import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseType } from '../../types/common';
import type { DataSignin, User, UserRegister } from '../../types/user';
const api_url = 'http://localhost:8000/';
/**
 * An API slice that provides methods for interacting with the user endpoint.
 * Containt the reducerPath, baseQuery, and endpoints.
 * reducerPath: The name of the reducer that will be added to the store.
 * baseQuery: The default fetch function that will be used for all endpoints.
 * endpoints: An object containing the endpoints for the API.
 */
const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${api_url}auth` }),
    endpoints: (builder) => ({
        login: builder.mutation<ResponseType<DataSignin>, User>({
            query: (body) => ({
                url: '/signin/',
                method: 'POST',
                body,
            }),
        }),
        register: builder.mutation<ResponseType<null>, UserRegister>({
            query: (body) => ({
                url: '/signup/',
                method: 'POST',
                body,
            }),
        }),
        validateToken: builder.mutation<ResponseType<null>, string>({
            query: (token) => ({
                url: '/validate-token/',
                method: 'POST',
                body: { token },
            }),
        }),
    }),
});

export default userApi;
export const {
    useLoginMutation, 
    useValidateTokenMutation,
    useRegisterMutation,
} = userApi;