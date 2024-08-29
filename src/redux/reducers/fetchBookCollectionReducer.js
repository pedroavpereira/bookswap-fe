import { createSlice } from '@reduxjs/toolkit';
import { fetchBookCollection } from '../actions/fetchBookCollectionAction';

const bookCollectionSlice = createSlice({
  name: 'bookCollection',
  initialState: {
    books: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload; // Set the books from the API response
      })
      .addCase(fetchBookCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message from the API response
      });
  }
});

export default bookCollectionSlice.reducer;
