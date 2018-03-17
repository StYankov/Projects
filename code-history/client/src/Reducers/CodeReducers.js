import { combineReducers } from 'redux';
import { 
    ADD_CODE,
    ADD_CODE_FAIL,
    ADD_CODE_SUCCESS,
    GET_RECENT_CODE_LOADING,
    GET_RECENT_CODE_SUCCESS,
    GET_SINGLE_CODE_DATA,
    GET_SINGLE_CODE_LOADING
} from '../Actions/CodeActions';
import STATUS from '../Consts/LoadingStatus';

function codeAdd(state = { status: STATUS.DONE }, action) {
    switch (action.type) {
        case ADD_CODE: {
            return {
                status: STATUS.PENDING
            }
        }
        case ADD_CODE_FAIL: {
            return {
                status: STATUS.ERROR
            }
        }
        case ADD_CODE_SUCCESS: {
            return {
                status: STATUS.DONE
            }
        }
        default: return state;
    }
}

function recentCode(state = { loading: false, data: null }, action) {
    switch (action.type){
        case GET_RECENT_CODE_LOADING: {
            return {
                data: null,
                loading: action.loading
            };
        }
        case GET_RECENT_CODE_SUCCESS: {
            return {
                loading: false,
                data: action.data
            };
        }
        default: return state;
    }
}

function currentCode(state = { data: null, loading: false }, action){
    switch (action.type){
        case GET_SINGLE_CODE_DATA: {
            return {
                data: action.data,
                loading: false
            };
        }
        case GET_SINGLE_CODE_LOADING: {
            return {
                data: null,
                loading: true
            };
        }
        default: return state;
    }
}

export default combineReducers({
    add: codeAdd,
    recent: recentCode,
    currentCode: currentCode
});
