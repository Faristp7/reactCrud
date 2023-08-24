import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    success: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.success = true;
    },
    logout(state, action) {
      state.success = false;
      state.user = {};
    },
  },
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    success: false,
  },
  reducers: { 
    setAdmin: (state, action) => {
      state.success = true;
    },
    adminlogout(state, action) {
      state.success = false;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export const { setUser, logout } = authSlice.actions;
export const { setAdmin , adminlogout} = adminSlice.actions;
export default store;
