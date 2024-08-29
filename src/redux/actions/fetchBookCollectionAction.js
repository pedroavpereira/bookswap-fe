import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Base URL for API requests
const API_URL = 'http://localhost:3000'; // Replace with your actual API URL if different

// Async thunk to fetch the user's book collection
export const fetchBookCollection = createAsyncThunk(
  'books/fetchCollection', // Action type prefix
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // Check if token exists
      if (!token) {
        throw new Error('User not authenticated'); // If no token, throw an error
      }

      // Make a GET request to the API to fetch the user's book collection
      const response = await axios.get(`${API_URL}/collection`, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token in request headers for authentication
        }
      });

      // Return the response data (book collection) if the request is successful
      return response.data;
    } catch (error) {
      // Handle errors and return a rejected value
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
