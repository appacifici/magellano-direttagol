export const addTodo = (name:string):any => {
    event.preventDefault();
    const newTodo = {name, user_id:1, dueDate: new Date().toLocaleDateString() }
    return {type:'ADD_TODO',payload:newTodo};    
}

export const removeTodo = (todo:any):any => {
    return {type:'REMOVE_TODO',payload:todo};    
}