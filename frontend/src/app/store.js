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
      console.log(action.payload);
      state.user = action.payload;
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
