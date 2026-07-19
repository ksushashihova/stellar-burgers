import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/slices/authSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      login({
        email,
        password
      })
    )
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LoginUI
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      errorText={error ?? ''}
    />
  );
};
