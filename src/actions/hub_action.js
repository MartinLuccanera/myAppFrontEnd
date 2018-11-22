import {EVENT_LOGGED_IN} from "./index";

export function hubAction(state) {

    console.log('Im at hubAction.');
    console.log('Payload: ', state);
    return {
        type: EVENT_LOGGED_IN,
        payload: state
    };
}