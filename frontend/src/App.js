import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import About from './components/NavBar/About';
import { authenticate } from './store/session';
import { HomePage } from './components/HomePage';
import Profile from './components/UserProfile/Profile';
import RestaurantPage from './components/RestaurantPage/RestaurantPage';
import UserReservations from './components/UserReservations/UserReservations';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [dropDown, setDropDown] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
          <NavBar dropDown={dropDown} setDropDown={setDropDown} />
      <div onClick={()=> setDropDown(false)}>
          <Switch>
            {/* <Route path='/login' exact={true}>
              <LoginForm />
            </Route> */}
            <Route path='/about' exact={true}>
              <About />
            </Route>
            <Route path='/users/reservations' exact={true} >
              <UserReservations />
            </Route>
            <Route path='/users/:userId' exact={true} >
              <Profile />
            </Route>
            <Route path='/restaurants/:restaurantId' exact={true}>
              <RestaurantPage />
            </Route>
            <Route path='/' exact={true} >
              <HomePage />
            </Route>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
