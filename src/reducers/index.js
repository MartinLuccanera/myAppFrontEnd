import { combineReducers } from 'redux';
import LoginReducer from './reducer_login';
import editProfileReducer from './reducer_profile_edit';

const rootReducer = combineReducers({
    login: LoginReducer,
    profile: editProfileReducer
});

export default rootReducer;
