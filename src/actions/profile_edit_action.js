import {EVENT_EDIT_PROFILE} from "./index";

/**
 * <p>Dispatches action of type {@link EVENT_EDIT_PROFILE} meaning the user wants to edit it's profile.</p>
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