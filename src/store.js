import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getUserReducer, registerUserReducer } from './reducer/userReducer';
import {
  createEventReducer,
  getEventsReducer,
  getSingleEventsReducer,
} from './reducer/eventsReduser';

const reducer = combineReducers({
  registerUser: registerUserReducer,
  createEvent: createEventReducer,
  getUser: getUserReducer,
  getEvents: getEventsReducer,
  getSingleEvent: getSingleEventsReducer,
});

const usersFromStorage = localStorage.getItem('users')
  ? JSON.parse(localStorage.getItem('users'))
  : [];

const eventsFromStorage = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : [];

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  registerUser: {
    users: usersFromStorage,
  },
  createEvent: {
    events: eventsFromStorage,
  },
  getUser: {
    user: userFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
