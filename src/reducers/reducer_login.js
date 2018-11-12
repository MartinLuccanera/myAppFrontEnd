import { EVENT_LOGIN } from '../actions/index';

/**
 * <p>Assemble the response from the authentication server into a JSON containing the payload (a promise) and the username
 * that requested the authentication.</p>
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function(state = null, action) {
    console.log('action type: ' + action.type);
    switch (action.type) {
        case EVENT_LOGIN:
            return {
                payload: action.payload,
                username: action.username
            }
    }
    return state;
}