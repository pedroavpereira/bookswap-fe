import { combineReducers } from 'redux';
import userReducer from './userReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,   
});

export default rootReducer;




