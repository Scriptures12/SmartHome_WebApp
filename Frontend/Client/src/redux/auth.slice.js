import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchData } from '../api/test';
import { loginUser, registerUser } from "../api/auth";
import { authInitialState } from "./states";

// Define login thunk action creator
export const login = createAsyncThunk(
  "auth/login",
  async (userData) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error) {
      console.log("err: ", error);
      throw error;
    }
  }
);

// Define register thunk action creator
export const register = createAsyncThunk(
  "auth/register",
  async (userData) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      console.log("err: ", error);
      throw error;
    }
  }
);

// Define logout thunk action creator
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    // Call logout API endpoint
    const response = await fetchData();
    console.log(response)
    return response;
  } catch (error) {
    console.log("err: ", error);
    throw error;
  }
});

// Define the authSlice slice of the Redux state
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState, // Initial state for the auth slice
  reducers: {
    // Reducer function to clear results (currently empty)
    clearResults() {},

    // Define the clearError action
    clearAuthError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling pending state for the login action
      .addCase(login.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
        state.isAuthenticated = false;
      })

      // Handling successful login
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set authentication state
        state.isLoading = false; // Set loading state
        state.user = {
          id: action.payload.data.user._id,
          role: action.payload.data.user.userType,
        }; // Update user data
        state.exp = action.payload.data.tokens.expiresIn;

        // Update default authorization header using Axios
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.data.tokens.access_token}`;

        // Save updated tokens to storage
      })

      // Handling failed login
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false; // Set loading state
        state.error = action.error.message; // Set error message
        state.isAuthenticated = false;
      })

      // Handling pending state for logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })

      // Handling successful logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false; // Clear authentication state
        state.isLoading = false; // Set loading state
        state.exp = 0;
        state.user = null; // Clear user data
        state.tokens = null; // Clear tokens
        state.error = null; // Clear any errors
        // Update default authorization header using Axios
        axios.defaults.headers.common["Authorization"] = undefined;

        // remove tokens from storage
      })

      // Handling failed logout
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false; // Set loading state
        state.error = action.error.message; // Set error message
      })

      // Handling pending state for registration
      .addCase(register.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })

      // Handling successful registration
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false; // Set loading state
        // state.reg_details = action.payload.data
      })

      // Handling failed registration
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false; // Set loading state
        state.error = action.error.message; // Set error message
      });
  },
});

export const { clearResults, clearAuthError } = authSlice.actions;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;

export const selectTokens = (state) => state.auth.tokens;

export const selectAuthError = (state) => state.auth.error;

export const selectAuthLoading = (state) => state.auth.isLoading;

export const selectUser = (state) => state.auth.user;
export const selectExpiry = (state) => state.auth.exp;

export default authSlice.reducer;
