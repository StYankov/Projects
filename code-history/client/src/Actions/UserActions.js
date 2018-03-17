import { URL } from '../Consts/MainAPI';
import Axios from 'axios';

export function registerUser(email, password, passwordRepeat, callback) {
    return dispatch => {
        Axios.post(`${URL}/auth/register`, {
            email,
            password,
            passwordRepeat
        })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                callback();
            })
            .catch(e => console.log(e.response.data));
    }
}

export function loginUser(email, password, callback) {
    return dispatch => {
        Axios.post(`${URL}/auth/login`, {
            email,
            password
        })
            .then(response => {
                localStorage.setItem('token', response.data.token);
            })
            .catch(e => console.log(e.response.data));
    }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export function recieveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isAuthenticated: true,
        userID: user._id
    }
}

export function loginError() {
    return {
        type: LOGIN_FAILURE,
        isAuthenticated: false,
        userID: null
    }
}

export function logout(){
    return {
        type: LOGOUT,
        isAuthenticated: false,
        userID: false
    }
}