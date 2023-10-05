import React from 'react';
import { connect } from 'react-redux';
import { addTodo, removeTodo } from '../../actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../../css/Bootstrap.min.css'; 
import { Dispatch } from '@reduxjs/toolkit';
//https://react-bootstrap.netlify.app/docs/components/cards


function TestMatch({addTodo, removeTodo, todos }:{addTodo:any, removeTodo:any, todos:any}) {            
    const todoEl = React.useRef<HTMLInputElement>(null);   
        
    const manageClick: React.MouseEventHandler<HTMLButtonElement> = (event):void => {
        event.preventDefault();
        addTodo(todoEl.current.value);
    }

    const deleteTodo = (todo:any):void => {
        event.preventDefault();
        removeTodo(todo);
    }
    
    return( 
        <>
            <div className='App container-fluid'>
                <h1>TestMatch</h1>               
                <ul>
                    {
                        todos.map( (
                            todo: { name: string }) => 
                                <li key={todo.name} className='list-group-item'>
                                    {todo.name}
                                    <Button variant="primary" onClick={ () => deleteTodo(todo) } className='m-2' >
                                        Remove
                                    </Button>
                                </li> 
                            )
                    }
                </ul>
            </div>
        </>
    );
}

//che fetta dello stato vogliamo passare al componente
//Che cosa vogliamo prendere dallo stato dello store per trasformalo in propietà?
const matchStateToProps = (state:any) => {
    return { todos: [...state] };
}

// const mapDispatchToProps = (dispatch:Dispatch) => {
//     return {
//         addTodoInProps: (name:string) => dispatch(addTodo(name)),
//         removeTodoInProps: (todo:any) => dispatch(removeTodo(todo)),
//     };
// }
// const createConnectot = connect(matchStateToProps,mapDispatchToProps);


//Metodo corto in sostituzione della funzione mapDispatchToProps passata al connect, poi ci pensa redux a mappare nel dispatch
const createConnectot = connect(matchStateToProps,{addTodo,removeTodo});

//Cosi esportiamo il component App e cosi ha accesso al metodo dispatch dello store
//dispatch  automaticamente viene richiamato 1 o piu reducer
export default createConnectot(TestMatch);