import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLoginRequest(state) {
      state.loading = true;
    },
    userLoginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userLoginRequest, userLoginSuccess, userLoginFail } = loginSlice.actions;

export default loginSlice.reducer;
