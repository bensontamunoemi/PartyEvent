import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  EDIT_EVENT_SUCCESS,
  GET_SINGLE_EVENT,
  GET_USER_EVENT,
} from '../constants/eventConstants';

export const eventCreate = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EVENT_REQUEST });

    // localStorage.setItem('users', JSON.stringify(data));
    const events = [];
    const eventsFromStorage = localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : [];

    if (eventsFromStorage) {
      eventsFromStorage.push(data);
      localStorage.setItem('events', JSON.stringify(eventsFromStorage));
    } else {
      events.push(data);
      localStorage.setItem('events', JSON.stringify(events));
    }
    dispatch({ type: CREATE_EVENT_SUCCESS, payload: eventsFromStorage });
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserEvents = (data) => async (dispatch) => {
  const eventsFromStorage = localStorage.getItem('events')
    ? JSON.parse(localStorage.getItem('events'))
    : [];

  const userFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  let filterUserEvent = eventsFromStorage.filter(
    (event) => event.user === userFromStorage._id
  );

  dispatch({ type: GET_USER_EVENT, payload: filterUserEvent });
};

export const updateEvent = (id, data) => async (dispatch) => {
  const eventsFromStorage =
    localStorage.getItem('events') &&
    JSON.parse(localStorage.getItem('events'));
  let newArray = [...eventsFromStorage];

  for (let index = 0; index < newArray.length; index++) {
    //   console.log('newArray[index]', newArray[index]);
    let eventToUpdate = newArray[index]._id === id;
    if (eventToUpdate === true) {
      newArray[index].name = data.name;
      newArray[index].date = data.date;
      newArray[index].description = data.description;
      localStorage.removeItem('events');
      localStorage.setItem('events', JSON.stringify(newArray));
    }
  }
};

export const singleEventAction = (data) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_EVENT, payload: data });
};
