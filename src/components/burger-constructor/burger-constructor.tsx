import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';

import { createOrder, clearOrder } from '../../services/slices/orderSlice';

import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.burgerConstructor);

  const user = useSelector((state) => state.auth.user);

  const { orderRequest, orderModalData } = useSelector((state) => state.order);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }

    if (!user) {
      navigate('/login');

      return;
    }

    const ids = [
      constructorItems.bun._id,

      ...constructorItems.ingredients.map((item) => item._id),

      constructorItems.bun._id
    ];

    dispatch(createOrder(ids))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,

        0
      ),

    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
