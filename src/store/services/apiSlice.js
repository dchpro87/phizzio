import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateUser } from '../features/user/userSlice';

export const apiSlice = createApi({
  reducerPath: 'phizzioApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['User', 'Password', 'Client'],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(
            updateUser({
              userId: user.id,
              name: user.name,
              email: user.email,
              cellphone: user.cellphone,
            })
          );
        } catch (err) {
          console.log('no session on first request(');
        }
      },
      providesTags: ['User'],
    }),
    updateUserById: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.userId}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
    updatePassword: builder.mutation({
      query: (payload) => ({
        url: '/users/update-my-password',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Password'],
    }),

    createClient: builder.mutation({
      query: (payload) => ({
        url: '/clients',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Client'],
    }),
    getClients: builder.query({
      query: (queryStr) => `/clients/${queryStr.userId}${queryStr.filter}`,
      providesTags: ['Client'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useUpdatePasswordMutation,
  useGetClientsQuery,
  useCreateClientMutation,
} = apiSlice;
