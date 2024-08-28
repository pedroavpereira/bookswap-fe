// src/redux/actions/userActions.js

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Use Vite's environment variable
const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Make a POST request with JSON data using the correct base URL
      const { data } = await axios.post(`${API_URL}/signup`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
