import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthChecked } = useSelector((state) => state.auth);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
