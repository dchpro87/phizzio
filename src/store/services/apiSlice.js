import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateUser } from '../features/user/userSlice';

export const apiSlice = createApi({
  reducerPath: 'phizzioApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['User', 'Password', 'Client', 'Appointment'],
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
    updateClient: builder.mutation({
      query: (payload) => ({
        url: '/clients',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Client'],
    }),
    deleteClient: builder.mutation({
      query: (payload) => ({
        url: `/clients?clientId=${payload.clientId}`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['Client', 'Appointment'],
    }),
    createAppointment: builder.mutation({
      query: (payload) => ({
        url: '/appointments',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Appointment'],
    }),
    updateAppointment: builder.mutation({
      query: (payload) => ({
        url: '/appointments',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Appointment'],
    }),
    getAllAppointments: builder.query({
      query: (queryStr) => `/appointments/${queryStr.filter}`,
      providesTags: ['Appointment'],
    }),
    deleteAppointment: builder.mutation({
      query: (payload) => ({
        url: `/appointments?appointmentId=${payload.appointmentId}`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['Appointment'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useUpdatePasswordMutation,
  useCreateClientMutation,
  useGetClientsQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useCreateAppointmentMutation,
  useGetAllAppointmentsQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = apiSlice;
