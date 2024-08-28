import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  token: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLoginRequest(state) {
      state.loading = true;
      state.error = null;  // Clear any existing errors on new request
    },
    userLoginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.user;  // Assuming action.payload contains user data
      state.token = action.payload.token;    // Assuming action.payload contains the token
      
      // Save token to local storage
      localStorage.setItem("token", action.payload.token);
    },
    userLoginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userValidateRequest(state) {
      state.loading = true;
      state.error = null;  // Clear any existing errors on new validation request
    },
    userValidateSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.user;  // Update userInfo with validated user data
    },
    userValidateFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
      state.userInfo = null;  // Clear userInfo on validation failure
      // Optionally remove the token from localStorage on validation failure
      localStorage.removeItem("token");
    },
    userLogout(state) {
      state.userInfo = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      // Remove token from local storage on logout
      localStorage.removeItem("token");
    },
  },
});

export const { 
  userLoginRequest, 
  userLoginSuccess, 
  userLoginFail,
  userValidateRequest,
  userValidateSuccess,
  userValidateFail,
  userLogout
} = loginSlice.actions;

export default loginSlice.reducer;

