import {EVENT_EDIT_PROFILE} from "../actions/index";

/**
 * <p>Receives the data from the profile fetch call..</p>
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