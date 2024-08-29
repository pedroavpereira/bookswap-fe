import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRegisterRequest(state) {
      state.loading = true;
    },
    userRegisterSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userRegisterFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userRegisterRequest, userRegisterSuccess, userRegisterFail } = userSlice.actions;

export default userSlice.reducer;




