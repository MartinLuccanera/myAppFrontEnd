import { EVENT_LOGIN } from '../actions/index';

export default function(state = [], action) {
    /* When reaching this part of the code, the request will no longer be a promise but the result of the AJAX request
     * to the API. It will contain the data that was returned by the server.
     * Remember that middlewares (like redux promise) have the ability to stop or manipulate actions before they hit
     * any reducer what so ever. Redux promise sees this incoming action (specifically at the 'payload' property). If
     * the payload is a promise, redux promise stops the action entirely and once the request finishes it dispatches
     * a new action of the same type but with a payload of a resolved request (sends the result instead of the promise,
     * which in this case is an asynchronous call).
     */
    console.log('action type: ' + action.type);
    switch (action.type) {
        case EVENT_LOGIN:
            //We need to return the new state with the sum of all the city the user has searched for + the new search.
            //return state.concat([action.payload.data]);
            console.log("action.payload");
            console.log(action.payload);
            return [ action.payload.data, ...state ];//ES6 version of the former line. Returns an array concatenated
                                                     //with the new element. DO NOT MUTATE STATE neither by 
                                                     //(state = new state) nor by state.push
    }
    return state;
}