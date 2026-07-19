import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { register } from '../../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      register({
        email,
        password,
        name: userName
      })
    )
      .unwrap()
      .then(() => {
        navigate('/');
      });
  };

  return (
    <RegisterUI
      errorText=''
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
