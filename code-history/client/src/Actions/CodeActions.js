import axios from 'axios';
import { Toast, ToastDanger } from 'react-toastr-basic';
import { URL } from '../Consts/MainAPI';
export const ADD_CODE = 'ADD_CODE';
export const ADD_CODE_SUCCESS = 'ADD_CODE_SUCCESS';
export const ADD_CODE_FAIL = 'ADD_CODE_FAIL';

export function addCode(code, syntax, expire, name) {
    return dispatch => {
        dispatch(addCodePending());
        axios.post(`${URL}/upload/code`, {
            code,
            syntax,
            expire,
            name
        })
            .then(response => {
                Toast('Кодът беше добавен успешно')
                dispatch(getRecentCode());
                dispatch(addCodeSuccess());
            })
            .catch(error => {
                ToastDanger(error.response.data.error || 'Грешка')
                dispatch(addCodeFail());
            });
    }
}

export function addCodePending() {
    return {
        type: ADD_CODE
    }
}

export function addCodeSuccess() {
    return {
        type: ADD_CODE_SUCCESS
    }
}

export function addCodeFail() {
    return {
        type: ADD_CODE_FAIL
    }
}

export const GET_RECENT_CODE_SUCCESS = 'GET_RECENT_CODE_SUCCESS';
export const GET_RECENT_CODE_LOADING = 'GET_RECENT_CODE_LOADING';

export function getRecentCode(){
    return dispatch => {
        dispatch(getRecentCodeLoading());
        axios.get(`${URL}/get/code`)
            .then(response => dispatch(getRecentCodeSuccess(response.data.data)))
            .catch(error => undefined);
    };
}

export function getRecentCodeSuccess(data){
    return {
        type: GET_RECENT_CODE_SUCCESS,
        data
    };
}

export function getRecentCodeLoading(){
    return {
        type: GET_RECENT_CODE_LOADING,
        loading: true
    }
}

export const GET_SINGLE_CODE_LOADING = 'GET_SINGLE_CODE_LOADING';
export const GET_SINGLE_CODE_DATA = 'GET_SINGLE_CODE_DATA';

export function getCode(id){
    return dispatch => {
        axios.get(`${URL}/get/code/${id}`)
            .then(response => dispatch(getSingleCodeData(response.data)))
            .catch(error => dispatch(getSingleCodeData(null)));
    }
}

export function getSingleCodeLoading(){
    return {
        type: GET_SINGLE_CODE_LOADING
    }
}

export function getSingleCodeData(data){
    return {
        type: GET_SINGLE_CODE_DATA,
        data
    }
}