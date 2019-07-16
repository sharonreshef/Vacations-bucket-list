import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_VACATIONS,
  VACATION_ERROR,
  UPDATE_FOLLOWERS,
  GET_VACATIONSBYUSER,
  DELETE_VACATION,
  GET_VACATIONDATA,
  ADD_VACATION,
  EDIT_VACATION
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

// Get specific vacation data
export const getVacationData = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/vacations/${id}`);
    dispatch({
      type: GET_VACATIONDATA,
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

// Delete vacation
export const deleteVacation = vacationId => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/vacations/${vacationId}`);
    dispatch({
      type: DELETE_VACATION,
      payload: vacationId
    });
    dispatch(setAlert('Vacation Removed', 'success'));
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

// Add vacation
export const addVacation = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/vacations/`,
      formData,
      config
    );
    dispatch({
      type: ADD_VACATION,
      payload: res.data
    });
    dispatch(getVacations());
    dispatch(setAlert('Vacation created', 'success'));
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

// Edit vacation
export const editVacation = (
  vacationId,
  formData,
  vacation
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (formData.vacationDescription === '') {
    formData.vacationDescription = vacation[0].vacationDescription;
  }
  if (formData.image === '') {
    formData.image = vacation[0].image;
  }
  if (formData.startingDate === '') {
    formData.startingDate = vacation[0].startingDate;
  }
  if (formData.endingDate === '') {
    formData.endingDate = vacation[0].endingDate;
  }
  if (formData.price === '') {
    formData.price = vacation[0].price;
  }

  try {
    const res = await axios.put(
      `http://localhost:5000/vacations/${vacationId}`,
      formData,
      config
    );
    dispatch({
      type: EDIT_VACATION,
      payload: res.data
    });
    dispatch(getVacations());
    dispatch(setAlert('VACATION EDITED', 'success'));
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
