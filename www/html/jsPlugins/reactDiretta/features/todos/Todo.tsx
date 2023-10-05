import React from 'react';
import Button from 'react-bootstrap/Button';
import { TodosInterface, TodoInterface } from '../../features/todos/todosSlice';

// interface WelcomeProps {
//     name: string,
// }
// const Welcome: React.SFC<WelcomeProps> = (props) => {
// return <h1>Hello, {props.name}</h1>;
// }

const Todo = ({todo, onRemoveTodo}:{todo:TodoInterface, onRemoveTodo:any}) => {
    return(
        <>            
            <li key={todo.name} className='list-group-item'>
                {todo.name}
                <Button variant="primary" onClick={ () => onRemoveTodo(todo) } className='m-2' >
                    Remove
                </Button>
            </li>                         
            
        </>
    );
}

export default Todo;