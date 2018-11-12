import { combineReducers } from 'redux';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
    login: LoginReducer
    //aca esta bien login? o sería username password???? u otra cosa como token??
});

export default rootReducer;
