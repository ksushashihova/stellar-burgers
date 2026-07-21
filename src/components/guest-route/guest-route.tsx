import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type GuestRouteProps = {
  children: ReactElement;
};

export const GuestRoute: FC<GuestRouteProps> = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const from = location.state?.from || '/';

  if (user) {
    return <Navigate to={from} replace />;
  }

  return children;
};
