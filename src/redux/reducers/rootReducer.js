import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fetchBookCollectionReducer from './fetchBookCollectionReducer';
 

const rootReducer = combineReducers({
  user: userReducer,
  fetchBookCollection: fetchBookCollectionReducer
});

export default rootReducer;




