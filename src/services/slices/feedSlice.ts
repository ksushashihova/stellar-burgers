import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getFeeds = createAsyncThunk(
  'feed/getFeeds',
  async () => await getFeedsApi()
);

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',

  initialState,

  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },

    setTotal(state, action) {
      state.total = action.payload;
    },

    setTotalToday(state, action) {
      state.totalToday = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;

        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export const { setOrders, setTotal, setTotalToday } = feedSlice.actions;

export default feedSlice.reducer;
