import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  schemes: [],
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
