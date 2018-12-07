import {EVENT_EDIT_PROFILE} from "./index";

/**
 * <p>Dispatches action of type {@link EVENT_LOGGED_IN} meaning user has completed the process of logging in.</p>
 *
 * @param state
 * @returns {{type, payload: *}}
 */
export function profileEditAction(state) {
    return {
        type: EVENT_EDIT_PROFILE,
        profile: state
    };
}