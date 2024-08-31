import React from "react";
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
} from '../reducers/userReducer';

import {AUTH_URL} from '../../utils/constants'
 



// Login action
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(userLoginRequest());

      const { data } = await axios.post(`${AUTH_URL}/login`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Login API Response:", data);

      if (data.token) {
        localStorage.setItem('token', data.token);
        dispatch(userLoginSuccess({ user: data.user, token: data.token }));
        dispatch(validateToken(data.token));
        return data;
      } else {
        throw new Error('Token not received from server');
      }
    } catch (error) {
      console.error("Login Error:", error);
      dispatch(userLoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      ));
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
      dispatch(userValidateRequest());

      const { data } = await axios.get(`${AUTH_URL}/validate-token`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      dispatch(userValidateSuccess({ user: data.user }));
      return data;
    } catch (error) {
      console.error("Validate Token Error:", error);
      dispatch(userValidateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      ));
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
  localStorage.removeItem('token');
  dispatch(userLogout());
};