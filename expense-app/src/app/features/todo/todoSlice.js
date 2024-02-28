import { createSlice } from "@reduxjs/toolkit";


export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoList: [{
            description: 'lorem',
            status: 'pending',
        }]
    },
    reducers: {
        addTodo: (state, action) => {
            console.log('action', action);
            state.todoList = [...state.todoList, action.payload]
        },
        updateTodo: (state, action) => {
            //todo update by id
        },
        deleteTodo: (state, action) => {
            state.todoList.splice(action.payload, 1);
        },
    }
})

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export const selectTodoList = (state) => {
    return state.todo.todoList
};

export default todoSlice.reducer;

