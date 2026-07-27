import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',

  async () => {
    const data = await getIngredientsApi();

    return data;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;

        state.ingredients = action.payload;
      })

      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;

        console.log(action.error);

        state.error = action.error.message || 'Ошибка загрузки';
      });
  }
});

export default ingredientsSlice.reducer;
