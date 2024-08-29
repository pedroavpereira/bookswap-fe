import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userValidateRequest,
  userValidateSuccess,
  userValidateFail,
  userLogout,
} from "../reducers/userReducer"; // Updated import

// Removed API_URL constant, relying on Vite's proxy

// Login action
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      // Dispatch login request action
      dispatch(userLoginRequest());

      // Make a POST request to login the user
      const { data } = await axios.post("/api/login", userData, {
        // Updated to use relative path
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Dispatch login success action with user data and token
      dispatch(userLoginSuccess({ user: data.user, token: data.token }));

      // Automatically validate user after login
      dispatch(validateToken(data.token));

      // Store the token explicitly (if not already handled in userLoginSuccess)
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      // Dispatch login fail action with the error message
      dispatch(
        userLoginFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );

      // Return a rejected promise with the error message
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Validate token action
export const validateToken = createAsyncThunk(
  "user/validateToken",
  async (token, { dispatch, rejectWithValue }) => {
    try {
      // Dispatch user validation request action
      dispatch(userValidateRequest());

      // Make a GET request to validate the token
      const { data } = await axios.get("/api/validate-token", {
        // Updated to use relative path
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      // Dispatch user validation success action
      dispatch(userValidateSuccess({ user: data.user }));

      return data;
    } catch (error) {
      // Dispatch user validation fail action
      dispatch(
        userValidateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );

      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Logout action
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("token");

  // Dispatch logout action
  dispatch(userLogout());
};
