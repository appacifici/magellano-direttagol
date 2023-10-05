import React from 'react';
import Button from 'react-bootstrap/Button';
import { addTodo, removeTodo, StateTodoInterface } from '../../features/todos/todosSlice';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import Todo from './Todo';
import { TodosInterface, TodoInterface } from '../../features/todos/todosSlice';

const Todos = ({todos}:{todos:any}) => {

    const dispatch  = useDispatch(); //Prendo la funzione dispatch per usarla e chiamare azioni nel codice da dispatchare
    
    const deleteTodo = (todo:TodoInterface):void => {
        event.preventDefault();
        dispatch( removeTodo(todo) ); //Fa dispatch dell'azione
    }

    return(
        <>
            <ul>
                {
                    todos.map( (todo: TodoInterface) => <Todo todo={todo} onRemoveTodo={deleteTodo}/> )
                }
            </ul>
        </>
    );
}

export default Todos;