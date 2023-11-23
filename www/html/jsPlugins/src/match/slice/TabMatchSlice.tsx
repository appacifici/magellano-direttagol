//{nameFile}Slice.tsx
import { createSlice, PayloadAction }       from "@reduxjs/toolkit";


interface TabMatchState {
    tab: string,
    follows: string[]
}

//TODO: da capire come settare un interfaccia su initialState
const initTabMatch:TabMatchState = {
    tab: 'all',
    follows: []
}

export const tabMatchSlice = createSlice({
    name: 'tabMatch',
    initialState: initTabMatch,
    reducers: {
        //addTodoName: addTodo(state, action) proprietà:funzione sotto c'è la versione con lo stesso nome senza specificare la proprieta con nome diverso
        clickTabMatch(state, action):TabMatchState {               
            state.tab = action.payload;
            return state;
        },
                
    }
});

// come crea le azioni:  todos/addTodo {type: 'todos/addTodo', payload: quello passato nella chiamata della funzione}
console.log(initTabMatch);
const {actions, reducer} = tabMatchSlice; //Destrutturiamo dalla slice azioni e reducer
export const {clickTabMatch} = actions; //Esportiamo le azioni
export type {TabMatchState};
export default reducer; //Esportiamo il reducer come default cosi lo possiamo richiamare con il nome che vogliamo