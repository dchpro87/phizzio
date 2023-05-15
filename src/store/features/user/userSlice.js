import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  cellphone: "",
  currentComplex: {},
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
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

///////////////////////////////////////////////////////
// actions
// const addTodoAction = {
//   type: 'todos/todoAdded',
//   payload: 'Buy milk'
// }

// action creators
// const addTodo = text => {
//   return {
//     type: 'todos/todoAdded',
//     payload: text
//   }
// }

// reducers
// const initialState = { value: 0 }

// function counterReducer(state = initialState, action) {
//   // Check to see if the reducer cares about this action
//   if (action.type === 'counter/increment') {
//     // If so, make a copy of `state`
//     return {
//       ...state,
//       // and update the copy with the new value
//       value: state.value + 1
//     }
//   }
//   // otherwise return the existing state unchanged
//   return state
// }

// store
// import { configureStore } from '@reduxjs/toolkit'

// const store = configureStore({ reducer: counterReducer })

// console.log(store.getState())
// // {value: 0}

// dispatch
// store.dispatch({ type: 'counter/increment' })

// console.log(store.getState())
// // {value: 1}

// const increment = () => {
//   return {
//     type: 'counter/increment'
//   }
// }

// store.dispatch(increment())

// console.log(store.getState())
// // {value: 2}

// selectors
// const selectCounterValue = state => state.value

// const currentValue = selectCounterValue(store.getState())
// console.log(currentValue)
// // 2
