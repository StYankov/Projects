import { combineReducers } from 'redux';
import CodeReducer from './CodeReducers';
import UserReducer from './UserReciers'

export default combineReducers({
    code: CodeReducer,
    user: UserReducer
});
