import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: null,
    success : false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.success = true
    },
    logout(state, action){
      state.success = false
      state.user = {}
    },
  },
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: {},
    token: null,
    success : false,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.user = action.payload;
      state.success = true
    },
    adminlogout(state, action){
      state.success = false
      state.user = {}
    },
  },
});

const store = configureStore({
  reducer:{
    auth : authSlice.reducer,
    admin : adminSlice.reducer
  }
})

export const { setUser, logout } = authSlice.actions;
export default store;
