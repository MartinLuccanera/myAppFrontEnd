import {EVENT_LOGGED_IN} from "./index";

export function hubAction(state) {

    console.log('hub_action - Im at hubAction.');
    console.log('hub_action - Payload: ', state);
    return {
        type: EVENT_LOGGED_IN,
        payload: state
    };
}