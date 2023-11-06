import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  schemes: [
    {
      id: 1,
      name: 'Fixed Deposit',
      interestRate: 5,
      maturityDate: '2024-12-31',
    },
    {
      id: 2,
      name: 'Savings Account',
      interestRate: 4.5,
      maturityDate: '2024-12-31',
    },
    {
      id: 3,
      name: 'Pension Scheme',
      interestRate: 6,
      maturityDate: '2024-12-31',
    },
    
  ],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loadUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    loadSchemes: (state, action) => {
      state.schemes = action.payload;
    },
    addScheme: (state, action) => {
      state.schemes.push(action.payload);
    },
    updateScheme: (state, action) => {
      const updatedScheme = action.payload;
      const index = state.schemes.findIndex((scheme) => scheme.id === updatedScheme.id);
      if (index !== -1) {
        state.schemes[index] = updatedScheme;
      }
    },
    deleteScheme: (state, action) => {
      const deletedSchemeId = action.payload;
      state.schemes = state.schemes.filter((scheme) => scheme.id !== deletedSchemeId);
      return state;
    },
  },
});

export const { loadUsers, deleteUser, loadSchemes, addScheme, updateScheme, deleteScheme } = adminSlice.actions;
export default adminSlice.reducer;
