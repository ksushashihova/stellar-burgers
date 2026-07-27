import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/authSlice';

export const Profile: FC = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!user) return;

    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!user) return;

    const updatedUser = {
      name: formValue.name,
      email: formValue.email
    };

    if (formValue.password) {
      Object.assign(updatedUser, {
        password: formValue.password
      });
    }

    dispatch(updateUser(updatedUser))
      .unwrap()
      .then(() => {
        setFormValue((prev) => ({
          ...prev,
          password: ''
        }));
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!user) return;

    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
    />
  );
};
