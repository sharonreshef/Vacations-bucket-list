import {
  GET_VACATIONS,
  VACATION_ERROR,
  UPDATE_FOLLOWERS,
  GET_VACATIONSBYUSER,
  DELETE_VACATION,
  GET_VACATIONDATA,
  ADD_VACATION,
  EDIT_VACATION
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
    case ADD_VACATION:
      return {
        ...state,
        vacations: [...state.vacations, payload],
        loading: false
      };
    case EDIT_VACATION:
      return {
        ...state
      };
    case GET_VACATIONDATA:
      return {
        ...state,
        vacation: payload,
        loading: false
      };
    case DELETE_VACATION:
      return {
        ...state,
        vacations: state.vacations.filter(vacation => vacation.id !== payload),
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
