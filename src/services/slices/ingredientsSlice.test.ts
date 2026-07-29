import reducer, { getIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('должен вернуть начальное состояние при неизвестном action', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('должен обработать getIngredients.pending', () => {
    const state = reducer(initialState, getIngredients.pending('', undefined));

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('должен обработать getIngredients.fulfilled', () => {
    const ingredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun'
      }
    ];

    const state = reducer(
      initialState,
      getIngredients.fulfilled(ingredients as any, '', undefined)
    );

    expect(state).toEqual({
      ingredients,
      isLoading: false,
      error: null
    });
  });

  it('должен обработать getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: {
        message: 'Ошибка загрузки'
      }
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
