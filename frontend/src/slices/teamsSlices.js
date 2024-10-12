import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch all teams
export const fetchAllTeams = createAsyncThunk(
  'team/fetchAll', // Ensure this matches the slice name
  async () => {
    const response = await axios.get('/api/teams'); // Your API endpoint
    return response.data; // Make sure this is returning an array
  }
);

const teamsSlice = createSlice({
  name: 'team', // This should match with useSelector
  initialState: {
    allTeams: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.allTeams = action.payload; // Assuming this is an array
      })
      .addCase(fetchAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message
      });
  },
});

export default teamsSlice.reducer; // Ensure the reducer is exported
