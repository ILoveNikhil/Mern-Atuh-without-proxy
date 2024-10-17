import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const server = `http://localhost:5000`;

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};


// Thunks for async actions
export const signupUser = createAsyncThunk('user/signup', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${server}/api/v1/user/signup`, { name, email, password }, { withCredentials: true });
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const loginUser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${server}/api/v1/user/login`, { email, password }, { withCredentials: true });
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const loadUserProfile = createAsyncThunk('user/loadProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/user/me`, { withCredentials: true });
    return data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true });
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
