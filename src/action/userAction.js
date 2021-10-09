import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
} from '../constants/userConstants';

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQUEST });

    // localStorage.setItem('users', JSON.stringify(data));
    const users = [];
    const usersFromStorage = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : [];

    if (usersFromStorage) {
      console.log('user#$', usersFromStorage);
      usersFromStorage.push(data);
      localStorage.setItem('users', JSON.stringify(usersFromStorage));
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      users.push(data);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(data));
    }
    dispatch({ type: CREATE_USER_SUCCESS, payload: usersFromStorage });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
