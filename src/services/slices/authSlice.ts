import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';

import { TUser } from '../../utils/types';
import { setCookie } from '../../utils/cookie';

// ================= LOGIN =================

export const login = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);

      localStorage.setItem('refreshToken', response.refreshToken);

      setCookie('accessToken', response.accessToken);

      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================= REGISTER =================

export const register = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string; name: string }) => {
    const response = await registerUserApi(data);

    localStorage.setItem('refreshToken', response.refreshToken);

    setCookie('accessToken', response.accessToken);

    return response.user;
  }
);

// ================= CHECK USER =================

export const checkUser = createAsyncThunk('auth/checkUser', async () => {
  const response = await getUserApi();

  return response.user;
});

// ================= UPDATE USER =================

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: { name?: string; email?: string; password?: string }) => {
    const response = await updateUserApi(data);

    return response.user;
  }
);

// ================= LOGOUT =================

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();

  localStorage.removeItem('refreshToken');

  setCookie('accessToken', '', { expires: -1 });
});

// ================= STATE =================

type AuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

// ================= SLICE =================

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // LOGIN

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Неверный email или пароль';
      })

      // REGISTER

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      // CHECK USER

      .addCase(checkUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(checkUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })

      .addCase(checkUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      })

      // UPDATE USER

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления данных';
      })

      // LOGOUT

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })

      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      });
  }
});

export default authSlice.reducer;
