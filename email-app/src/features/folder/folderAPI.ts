import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseType } from '../../types/common';
import { Folder } from '../../types/folder';
import { RootState } from '../../store';
const api_url = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * An API slice that provides methods for interacting with the user endpoint.
 * Containt the reducerPath, baseQuery, and endpoints.
 * reducerPath: The name of the reducer that will be added to the store.
 * baseQuery: The default fetch function that will be used for all endpoints.
 * endpoints: An object containing the endpoints for the API.
 */

const folderApi = createApi({
  reducerPath: 'folderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${api_url}folders`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Folder'],
  endpoints: (builder) => ({
    allFolder: builder.query<ResponseType<Folder[]>, void>({
        query: () => ({
            url: '/',
            method: 'GET',
        }),
    }),
    folderById: builder.query<ResponseType<Folder>, number>({
      query: (id) => ({
        url: `/${id}/`,
        method: 'GET',
      }),
    }),
    deleteFolderById: builder.mutation<ResponseType<Folder>, string>({
      query: (id) => ({
        url: `/${id}/`,
        method: 'DELETE',
      }),
    }),
    createFolder: builder.mutation<ResponseType<Folder>, Partial<Folder>>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default folderApi;
export const {
  useAllFolderQuery,
  useFolderByIdQuery,
  useDeleteFolderByIdMutation,
  useCreateFolderMutation,
} = folderApi;