import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseType } from '../../types/common';
import type { DataSignin, UserSignin, UserRegister } from '../../types/user';
const api_url = 'http://3.87.243.133:8000/';
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
    signin: builder.mutation<ResponseType<DataSignin>, UserSignin>({
      query: (body) => ({
        url: '/signin/',
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation<ResponseType<DataSignin>, UserRegister>({
      query: (body) => ({
        url: '/signup/',
        method: 'POST',
        body,
      }),
    }),
    validateToken: builder.mutation<ResponseType<null>, string>({
      query: (token) => ({
        url: '/validate_token/',
        method: 'POST',
        body: { token },
      }),
    }),
  }),
});

export default userApi;
export const {
  useSigninMutation,
  useSignupMutation,
  useValidateTokenMutation,
} = userApi;
