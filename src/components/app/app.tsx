import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { OrderInfo } from '../order-info';
import { Modal } from '../modal';
import { IngredientDetails } from '../ingredient-details';
import { ProtectedRoute } from '../protected-route/protected-route';
import { GuestRoute } from '../guest-route/guest-route';

import { useEffect } from 'react';

import { checkUser } from '../../services/slices/authSlice';

import { useDispatch, useSelector } from '../../services/store';

import { getIngredients } from '../../services/slices/ingredientsSlice';

import { AppHeader } from '@components';
import { Preloader } from '@ui';

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background;

  const { isLoading, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUser());
  }, [dispatch]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {isLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : (
        <>
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />

            <Route path='/feed' element={<Feed />} />

            <Route
              path='/login'
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />

            <Route
              path='/register'
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />

            <Route
              path='/forgot-password'
              element={
                <GuestRoute>
                  <ForgotPassword />
                </GuestRoute>
              }
            />

            <Route
              path='/reset-password'
              element={
                <GuestRoute>
                  <ResetPassword />
                </GuestRoute>
              }
            />

            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />

            {/* прямой переход */}
            <Route path='/ingredients/:id' element={<IngredientDetails />} />

            <Route path='/feed/:number' element={<OrderInfo />} />

            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {/* модальные окна */}

          {background && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='' onClose={handleClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />

              <Route
                path='/feed/:number'
                element={
                  <Modal title='' onClose={handleClose}>
                    <OrderInfo />
                  </Modal>
                }
              />

              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <Modal title='' onClose={handleClose}>
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
