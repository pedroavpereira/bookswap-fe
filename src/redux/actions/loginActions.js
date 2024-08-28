import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// No need to use VITE_API_URL directly due to the Vite proxy setup
const API_URL = '/api';

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      // Make a POST request using the proxy URL
      const { data } = await axios.post(`${API_URL}/login`, userData, {
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


