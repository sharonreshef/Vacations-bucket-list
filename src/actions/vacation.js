import axios from 'axios';
import { setAlert } from './alert';
import { GET_VACATIONS, VACATION_ERROR } from './types';

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
      type: VACATION_ERROR
      // payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
