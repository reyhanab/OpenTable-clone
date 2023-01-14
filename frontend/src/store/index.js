import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import users from './users'
import restaurants from './restaurants'
import reviews from './reviews'
import reservations from './reservations'
import images from './images'
// import googleApi from './googleApi';
import nearRestaurants from './nearRestaurants'

const rootReducer = combineReducers({
  session,
  users,
  restaurants,
  reviews,
  reservations,
  images,
  nearRestaurants
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
