import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getProfileOrders = createAsyncThunk(
  'profileOrders/getProfileOrders',
  async () => await getOrdersApi()
);

type ProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',

  initialState,

  reducers: {
    setProfileOrders: (state, action) => {
      state.orders = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(getProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })

      .addCase(getProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки истории заказов';
      });
  }
});

export const { setProfileOrders } = profileOrdersSlice.actions;

export default profileOrdersSlice.reducer;
