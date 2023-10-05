import { createStore } from 'redux';

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

const reducer = (state:any,action:any) => {
    switch(action.type) {
        case 'ADD_TODO':         
            return[action.payload, ...state];
        case 'REMOVE_TODO':         
            return state.filter( (t: { name: string; }) => t.name !== action.payload.name );
        default:
            return state;
    }
    
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() ;
export const Store = createStore(reducer, initTodos, composeEnhancers );

