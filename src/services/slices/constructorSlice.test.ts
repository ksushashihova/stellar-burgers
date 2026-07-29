import reducer, {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';

describe('constructorSlice', () => {
  const bun = {
    _id: 'bun1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 100,
    image: 'test.png',
    image_large: 'test-large.png',
    image_mobile: 'test-mobile.png'
  };

  const ingredient1 = {
    _id: '1',
    id: '1',
    name: 'Соус',
    type: 'sauce',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 10,
    price: 50,
    image: 'test.png',
    image_large: 'test-large.png',
    image_mobile: 'test-mobile.png'
  };

  const ingredient2 = {
    _id: '2',
    id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 5,
    calories: 200,
    price: 150,
    image: 'test.png',
    image_large: 'test-large.png',
    image_mobile: 'test-mobile.png'
  };

  const initialState = {
    bun: null,
    ingredients: []
  };

  it('должен вернуть начальное состояние при неизвестном action', () => {
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('должен установить булку', () => {
    const state = reducer(initialState, setBun(bun));

    expect(state.bun).toEqual(bun);
  });

  it('должен добавить ингредиент', () => {
    const state = reducer(initialState, addIngredient(ingredient1));

    expect(state.ingredients).toEqual([ingredient1]);
  });

  it('должен удалить ингредиент', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const state = reducer(stateWithIngredients, removeIngredient('1'));

    expect(state.ingredients).toEqual([ingredient2]);
  });

  it('должен переместить ингредиент', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const state = reducer(
      stateWithIngredients,
      moveIngredient({
        fromIndex: 0,
        toIndex: 1
      })
    );

    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('должен очистить конструктор', () => {
    const state = reducer(
      {
        bun,
        ingredients: [ingredient1, ingredient2]
      },
      clearConstructor()
    );

    expect(state).toEqual(initialState);
  });
});
