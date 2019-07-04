import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_VACATIONS,
  VACATION_ERROR,
  UPDATE_FOLLOWERS,
  GET_VACATIONSBYUSER
} from './types';

// Get Vacations followed by user
export const getVacationsfollowedByUser = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/vacations/followed');
    dispatch({
      type: GET_VACATIONSBYUSER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Vacations
export const getVacations = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/vacations/');
    dispatch({
      type: GET_VACATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add follow
export const addFollow = vacationId => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/vacations/follow/${vacationId}`
    );
    dispatch({
      type: UPDATE_FOLLOWERS
    });
    dispatch(getVacationsfollowedByUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: VACATION_ERROR
    });
  }
};

// Remove follow
export const removeFollow = vacationId => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/vacations/unfollow/${vacationId}`
    );
    dispatch({
      type: UPDATE_FOLLOWERS
    });
    dispatch(getVacationsfollowedByUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: VACATION_ERROR
    });
  }
};
