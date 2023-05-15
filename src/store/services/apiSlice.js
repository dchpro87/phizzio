import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateUser } from '../features/user/userSlice';

export const apiSlice = createApi({
  reducerPath: 'comlogApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['User', 'Password', 'Complex', 'Units', 'ComplianceLogs'],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            updateUser({
              userId: data.user.id,
              name: data.user.name,
              email: data.user.email,
              cellphone: data.user.cellphone,
              currentComplex: data.user.currentComplex,
            })
          );
        } catch (err) {
          console.log('💥 no session on first request :-(');
          // console.log(err.error.data.message);
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
      invalidatesTags: ['User', 'Complex'],
    }),
    updatePassword: builder.mutation({
      query: (payload) => ({
        url: '/users/update-my-password',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Password'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useUpdatePasswordMutation,
} = apiSlice;
