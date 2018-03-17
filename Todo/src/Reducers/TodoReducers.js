import { 
    ADD_TODO,
    COMPLETE_TODO,
    DELETE_TODO,
    UNCOMPLETE_TODO
} from '../Actions/TodoActions';

export default function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO: {
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: action.completed
                }
            ]
        }
        case COMPLETE_TODO: {
            return state.map(todo => todo.id === action.id ? {
                ...todo,
                completed: true
            } : todo);
        }
        case DELETE_TODO: {
            return state.filter(todo => todo.id !== action.id);
        }
        case UNCOMPLETE_TODO: {
            return state.map(todo => todo.id === action.id ? {
                ...todo,
                completed: false
            } : todo);
        }
        default: return state;
    }
}