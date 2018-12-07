import {EVENT_EDIT_PROFILE} from "../actions/index";

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
        case EVENT_EDIT_PROFILE:
            console.log('action: ', action);
            return {
                login: action.login,
                data: action.profile
            };
    }
    //Default response (redux stuff).
    return state;
}