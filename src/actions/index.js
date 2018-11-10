import axios from 'axios';

const API_URL = '';
const API_LOGIN_ENDPOINT = '';

export const EVENT_LOGIN = 'EVENT_LOGIN';

export function login(user, pass) {

    const url = `${API_URL}/${API_LOGIN_ENDPOINT}`; //falta agregar user y pass

    const request = axios.get(url);

    return {
        type: EVENT_LOGIN,
        payload: request
    };
}