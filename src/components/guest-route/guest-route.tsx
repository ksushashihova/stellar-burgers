import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

type GuestRouteProps = {
  children: ReactElement;
};

export const GuestRoute: FC<GuestRouteProps> = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
