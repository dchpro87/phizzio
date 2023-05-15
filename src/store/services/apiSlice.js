import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateUser } from '../features/user/userSlice';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

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
    addNewComplex: builder.mutation({
      query: (payload) => ({
        url: '/complexes/add-complex',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User', 'Complex'],
    }),
    getComplexById: builder.query({
      query: (complexId) => `/complexes/${complexId}`,
      providesTags: ['Complex'],
    }),
    updateComplex: builder.mutation({
      query: (payload) => ({
        url: `/complexes/${payload.id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['User', 'Complex'],
    }),
    getUnitsByComplexId: builder.query({
      query: (complexId) => `/units?complexId=${complexId}`,
      providesTags: ['Units'],
    }),
    updateUnitById: builder.mutation({
      query: (payload) => ({
        url: `/units/${payload.id}`,
        method: 'PATCH',
        body: payload.data,
      }),
      invalidatesTags: ['Units'],
    }),
    makeFakeUnits: builder.mutation({
      query: (complexId) => ({
        url: `/units/make-fake-units?complexId=${complexId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Units'],
    }),
    addTeamMember: builder.mutation({
      query: (payload) => ({
        url: '/complexes/add-team-member',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['User', 'Complex'],
    }),
    removeTeamMember: builder.mutation({
      query: (payload) => ({
        url: '/complexes/remove-team-member',
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['User', 'Complex'],
    }),
    updateTeamMember: builder.mutation({
      query: (payload) => ({
        url: '/complexes/update-team-member',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['User', 'Complex'],
    }),
    createComplianceLog: builder.mutation({
      query: (payload) => ({
        url: '/complianceLogs',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ComplianceLogs', 'Units'],
    }),
    getComplianceLogs: builder.query({
      query: (queryStr) => `/complianceLogs/${queryStr}`,
      providesTags: ['ComplianceLogs'],
    }),
    updateComplianceLogs: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/complianceLogs/?id=${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['ComplianceLogs', 'Units'],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useUpdatePasswordMutation,
  useAddNewComplexMutation,
  useGetComplexByIdQuery,
  useUpdateComplexMutation,
  useAddTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useRemoveTeamMemberMutation,
  useGetUnitsByComplexIdQuery,
  useMakeFakeUnitsMutation,
  useUpdateUnitByIdMutation,
  useCreateComplianceLogMutation,
  useGetComplianceLogsQuery,
  useUpdateComplianceLogsMutation,
} = apiSlice;
