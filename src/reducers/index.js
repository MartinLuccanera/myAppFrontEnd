import { combineReducers } from 'redux';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
    //state: (state = {}) => state
    login: LoginReducer
});

export default rootReducer;
