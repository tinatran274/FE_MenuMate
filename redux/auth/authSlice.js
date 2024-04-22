import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  userToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUserToken: (state) => {
      state.userToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setAuthLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUserToken, clearUserToken, setAuthLoading, setAuthError } = authSlice.actions;


export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch(setAuthLoading());
    const options = {
      method: 'POST',
      url: 'https://widely-discrete-glowworm.ngrok-free.app/api/auth/login',
      data: {
        email: username,
        password: password,
      },
    }
    const response = await axios.request(options);
    if (response.status >= 200 && response.status < 300) {
      const token = response.data.access_token;
      dispatch(setUserToken(token));
      await AsyncStorage.setItem('localToken', token)
    } else {
      dispatch(setAuthError('Login failed. Please check your credentials.'));
    }
  } catch (error) {
    dispatch(setAuthError('Login failed. Please check your credentials.'));
  }
}

export const registerUser = (username, password) => async (dispatch) => {
  try {
    dispatch(setAuthLoading());
    const options = {
      method: 'POST',
      url: 'https://widely-discrete-glowworm.ngrok-free.app/api/auth/register',
      data: {
        email: username,
        password: password,
      },
    };
    const response = await axios.request(options);
    if (response.status >= 200 && response.status < 300) {
      const token = response.data.access_token;
      dispatch(setUserToken(token));
      await AsyncStorage.setItem('localToken', token);
    } else {
      // console.error('Registration failed. Server responded with:', response.status);
      dispatch(setAuthError('Registration failed. Please try again later.'));
    }
  } catch (error) {
    // console.error('Error during registration:', error);
    dispatch(setAuthError('Registration failed. Please try again later.'));
  }
}


// Selector to get the user token from the state
export const selectUserToken = (state) => state.auth.userToken;

// Selector to check if the user is authenticated
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Selector to get the loading state
export const selectAuthLoading = (state) => state.auth.loading;

// Selector to get the error state
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;