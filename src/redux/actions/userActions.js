import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Base URL for API requests, using Vite proxy
const API_URL = '/api';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Debugging: log the API URL and user data to ensure they're loaded correctly
      console.log("API Base URL:", API_URL);
      console.log("User Data:", userData);

      // Make a POST request with JSON data using the proxy URL
      const { data } = await axios.post(`${API_URL}/signup`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response Data:", data); // Log the response data for debugging
      return data;
    } catch (error) {
      console.error("Error Response:", error.response); // Log the error response for debugging
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

