import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button
  className="text-red-500"
  onClick={onLogout}>Sign out</button>;
};

export default LogoutButton;
