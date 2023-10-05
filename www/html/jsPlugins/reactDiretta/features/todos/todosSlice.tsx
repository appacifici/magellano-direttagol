import { CaseReducer, createSlice } from "@reduxjs/toolkit";

export interface TodoInterface {     
    name: string,
    duedate: string,
    user_id: number        
};

export interface TodosInterface { 
    [index: number]: TodoInterface        
};

export interface StateTodoInterface {
    todos: Array<TodosInterface>        
}
 
export type TodosType = {
    name: string,
    duedate: string,
    user_id: number,
}[];

//TODO: da capire come settare un interfaccia su initialState
const initTodos = [
    {
        name: 'Call my num',
        duedate: new Date().toLocaleDateString(),
        user_id:1
    },
    {
        name: 'Goto school',
        duedate: new Date().toLocaleDateString(),
        user_id:1
    },
    {
        name: 'Do my homework',
        duedate: new Date().toLocaleDateString(),
        user_id:1
    },
];


export const todosSlice = createSlice({
    name: 'todos',
    initialState: initTodos,
    reducers: {
        addTodo(state, action) {
            console.log('reducer', state, action );
            state.push(action.payload); //Con Redux Toolikt possiamo modificare direttamente lo stato ma toolkit si farà una copia
        },
        
        removeTodo(state, action) {
            return state.filter( todo => todo.name !== action.payload.name ); //Per far partire le modifiche sullo stato o lo modifichiamo o lo restituiamo
        }
    }
});

console.log(todosSlice);
const {actions, reducer} = todosSlice; //Destrutturiamo dalla slice azioni e reducer
export const {addTodo, removeTodo} = actions; //Esportiamo le azioni
export default reducer; //Esportiamo il reducer come default cosi lo possiamo richiamare con il nome che vogliamo