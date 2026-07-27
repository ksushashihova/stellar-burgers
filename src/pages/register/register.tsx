import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { register } from '../../services/slices/authSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      register({
        email,
        password,
        name: userName
      })
    );
  };

  return (
    <RegisterUI
      errorText={error ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      userName={userName}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
