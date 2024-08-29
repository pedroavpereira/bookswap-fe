import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  token: null,  // Added from loginReducer
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // User registration reducers
    userRegisterRequest(state) {
      state.loading = true;
      state.error = null;  // Ensure errors are cleared on request
    },
    userRegisterSuccess(state, action) {
      state.loading = false;
      const userData = action.payload.user;  // Extract user object
      state.userInfo = userData;

      // Store the user object in local storage
      console.log("Storing user info to localStorage:", userData);
      localStorage.setItem('userInfo', JSON.stringify(userData));
    },
    userRegisterFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // User login reducers
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

    // User validation reducers
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

    // User logout reducer
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
  userRegisterRequest, 
  userRegisterSuccess, 
  userRegisterFail,
  userLoginRequest, 
  userLoginSuccess, 
  userLoginFail,
  userValidateRequest,
  userValidateSuccess,
  userValidateFail,
  userLogout
} = userSlice.actions;

export default userSlice.reducer;

 
