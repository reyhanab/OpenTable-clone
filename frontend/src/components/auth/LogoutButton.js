import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = ({setDropDown}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = (e) => {
    dispatch(logout());
    setDropDown(state => !state)
    history.push("/")
    // return <Redirect to="/"/>

  };

  return <button
  className="text-red-500"
  onClick={onLogout}>Sign out</button>;
};

export default LogoutButton;
