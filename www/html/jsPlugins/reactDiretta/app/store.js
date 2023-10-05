import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";

export const Store = configureStore({
    reducer: {
        todos: todosReducer, //pezzo di stato
    },
});