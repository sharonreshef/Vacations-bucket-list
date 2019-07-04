import {
  GET_VACATIONS,
  VACATION_ERROR,
  UPDATE_FOLLOWERS,
  GET_VACATIONSBYUSER
} from '../actions/types';

const initialState = {
  vacations: [],
  vacationsFollowedByUser: [],
  vacation: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VACATIONSBYUSER:
      return {
        ...state,
        vacationsFollowedByUser: payload
      };
    case GET_VACATIONS:
      return {
        ...state,
        vacations: payload,
        loading: false
      };
    case VACATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_FOLLOWERS:
      return {
        ...state
      };
    default:
      return state;
  }
}
