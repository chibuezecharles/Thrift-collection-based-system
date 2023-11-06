import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // Store registered user details
  currentUser: null, // Store the currently logged-in user
  accountHistory: [],
  activeSchemes: [],
  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.users = [action.payload, ...state.users];
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    makePayment: (state, action) => {
      const { amount, paymentMethod } = action.payload; // Include paymentMethod in the payload

      if (amount !== undefined && !isNaN(parseFloat(amount))) {
        const currentDate = new Date();
        const paymentWithTimestamp = {
          amount,
          date: currentDate.toLocaleDateString(),
          time: currentDate.toLocaleTimeString(),
          paymentMethod, // Include the payment method in the payment data
        };
        state.accountHistory.push(paymentWithTimestamp);
      } else {
        console.error('Invalid payment amount:', amount);
      }
    },
    enrollInScheme: (state, action) => {
      state.activeSchemes.push(action.payload);
    },
    unregisterFromScheme: (state, action) => {
      const schemeId = action.payload;
      state.activeSchemes = state.activeSchemes.filter((scheme) => scheme.id !== schemeId);
    },
  },
});

export const { registerUser, loginUser, logoutUser, makePayment, enrollInScheme, unregisterFromScheme } = userSlice.actions;
export default userSlice.reducer;
