import { EVENT_LOGIN } from '../actions/index';
import {EVENT_LOGGED_IN} from "../actions";

/**
 * <p>Assemble the response from the authentication server into a JSON containing the payload (a promise) and the username
 * that requested the authentication.</p>
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function(state = null, action) {
    switch (action.type) {
        //Login attempt.
        case EVENT_LOGIN:
            return {
                payload: action.payload,
                username: action.username,
            };
        //Login was successful.
        case EVENT_LOGGED_IN:
            return {
                payload: action.payload,
                username: action.username
            }
    }
    //Default response (redux stuff).
    return state;
}