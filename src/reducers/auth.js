import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAthunticated: null,
  // isAdmin: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      console.log(payload.token);
      return { ...state, ...payload, isAthunticated: true, loading: false };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return { ...state, token: null, isAthunticated: false, loading: false };
    default:
      return state;
  }
}
