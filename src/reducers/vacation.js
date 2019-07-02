import { GET_VACATIONS, VACATION_ERROR } from '../actions/types';

const initialState = {
  vacations: [],
  vacation: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
    default:
      return state;
  }
}
