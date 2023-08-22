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

const store = configureStore({
  reducer:{
    auth : authSlice.reducer,
  }
})

export const { setUser, logout } = authSlice.actions;
export default store;
