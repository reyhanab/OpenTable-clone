import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.pish("/")
  };

  return <button
  className="text-red-500"
  onClick={onLogout}>Sign out</button>;
};

export default LogoutButton;
