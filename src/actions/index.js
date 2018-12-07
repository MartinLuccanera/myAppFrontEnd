import axios from 'axios';

const API_URL = 'http://localhost:8080/oauth';
const API_LOGIN_ENDPOINT = 'token';

export const EVENT_LOGIN = 'EVENT_LOGIN';
export const EVENT_LOGGED_IN = 'EVENT_LOGGED_IN';
export const EVENT_EDIT_PROFILE = 'EVENT_EDIT_PROFILE';

/**
 * <p>Hits the corresponding endpoint located at {@link API_URL @link API_LOGIN_ENDPOINT} with provided username and password.</p>
 *
 * @param user
 * @param pass
 * @returns {{type: string[event], username: *, payload: AxiosPromise<any>}}
 */
export function fetchLogin(user, pass) {

    /*
    ?grant_type=password&username=admin&password=admin1234&client_id=spring-security-oauth2-read-write-client
     */
    const url = `${API_URL}/${API_LOGIN_ENDPOINT}?grant_type=password&username=${user}&password=${pass}&client_id=spring-security-oauth2-read-write-client`;
    //performs async request for auth data.
    const request = axios.post(
        url, {}, {
            headers: {
                Authorization: "Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA=="
            }
        }
    );

    return {
        type: EVENT_LOGIN,
        username: user,
        payload: request
    };
}