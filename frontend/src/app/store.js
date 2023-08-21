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
      console.log(state.success, "this is store");
    },
  },
});

const store = configureStore({
  reducer:{
    auth : authSlice.reducer,
  }
})

export const { setUser } = authSlice.actions;
export default store;
