import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import vacation from './vacation';

export default combineReducers({
  alert,
  auth,
  vacation
});
