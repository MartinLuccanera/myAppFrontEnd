import {EVENT_LOGGED_IN} from "./index";

/**
 * <p>Dispatches action of type {@link EVENT_LOGGED_IN} meaning user has completed the process of logging in.</p>
 *
 * @param state
 * @returns {{type, payload: *}}
 */
export function hubAction(state) {
    return {
        type: EVENT_LOGGED_IN,
        payload: state
    };
}