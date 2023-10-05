import React from 'react';

//useSelector Hook seleziona una fetta dallo store
//useDispatch Hook permette di fare la dispatch di un azione
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { addTodo, StateTodoInterface } from '../../features/todos/todosSlice';
import Todos from '../../features/todos/Todos';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../css/Bootstrap.min.css'; 


function App() {            
    
    const useTypedSelector: TypedUseSelectorHook<StateTodoInterface> = useSelector;
    const todos     = useTypedSelector( state => state.todos ); //useSelector riceve lo stato dallo store, e selezioniamo quale pezzo di stato prendere
    
    //const todos     = useSelector( ( state:any ) => state.todos ); //Versione senza typescript
    const dispatch  = useDispatch(); //Prendo la funzione dispatch per usarla e chiamare azioni nel codice da dispatchare

    const todoEl = React.useRef<HTMLInputElement>(null);   
        
    const manageClick: React.MouseEventHandler<HTMLButtonElement> = (event):void => {
        event.preventDefault();
        dispatch( addTodo({name:todoEl.current.value, dueDate: new Date(), user_id:1}) ); //Fa dispatch dell'azione
    }    
    
    return( 
        <>
            <div className='App container-fluid'>
                <h1>Redux</h1>
                <div className='row'>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">                        
                        <Form.Control ref={todoEl} type="text" name="todo" placeholder="Todo" />
                    </Form.Group>                    
                    <Button variant="primary" onClick={manageClick} className='m-2' >
                        Submit
                    </Button>
                </Form>
                </div>
                <Todos todos={todos} />
            </div>
        </>
    );
}



export default App;