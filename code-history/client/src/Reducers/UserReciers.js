import { LOGOUT, LOGIN_FAILURE, LOGIN_SUCCESS } from '../Actions/UserActions';

const initialState = {
    isAuthenticated: false,
    userID: null
}

export default function userReducer(state = initialState, actions){
    switch (actions.type){
        case LOGOUT: {
            return {
                initialState
            }
        }
        case LOGIN_FAILURE: {
            return {
                initialState
            }
        }
        case LOGIN_SUCCESS: {
            return {
                isAuthenticated: true,
                userID: actions.userID
            }
        }
        default: return state;
    }
}