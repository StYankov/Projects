import { combineReducers } from 'redux';
import Todos from './TodoReducers';

const todoApp = combineReducers({
    todos: Todos
});

export default todoApp;