import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
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
  dispatch({ type: GET_USER_EVENT, payload: data });
};

export const singleEventAction = (data) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_EVENT, payload: data });
};
