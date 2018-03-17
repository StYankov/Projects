export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'UNDERLINE_TODO';
export const UNCOMPLETE_TODO = 'UNCOMPLETE_TODO';

let todoIndex = 0;

export function addTodo(todo){
    return {
        type: ADD_TODO,
        id: todoIndex++,
        text: todo,
        completed: false
    };
}

export function deleteTodo(id){
    return {
        type: DELETE_TODO,
        id
    };
}

export function completeTodo(id){
    return {
        type: COMPLETE_TODO,
        id
    };
}

export function unCompleteTodo(id){
    return {
        type: UNCOMPLETE_TODO,
        id
    };
}
