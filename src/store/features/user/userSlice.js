import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  cellphone: '',
  currentComplex: {},
  userId: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state, action) => {
      return initialState;
    },
    updateUser: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.cellphone = action.payload.cellphone;
      state.currentComplex = action.payload.currentComplex;
    },
    updateUserName: (state, action) => {
      state.name = action.payload.name;
    },
    updateUserEmail: (state, action) => {
      state.email = action.payload.email;
    },
    updateUserCellphone: (state, action) => {
      state.cellphone = action.payload.cellphone;
    },
  },
});

export const {
  reset,
  updateUser,
  updateUserName,
  updateUserEmail,
  updateUserCellphone,
} = userSlice.actions;

export default userSlice.reducer;
