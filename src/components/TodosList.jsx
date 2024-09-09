import {useEffect, useState} from 'react';
import Todo from './Todo';
import NewTodo from './NewTodo';

const TodosList = ({ todos, userId, updateUserTodos}) => { 
  const [openNewTodoDialog, setOpenNewTodoDialog] = useState(false);
  const [showTodosList, setShowTodosList] = useState(true);
  const [nextTodoId, setNextTodoId] = useState();
 

  const handleMarkCompleted = (todoId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: true } : todo
    );
    updateUserTodos(userId, updatedTodos); 
  };

  const addNewTodo = (userId, todo) => {

    const newTodos = [...todos,todo];
    updateUserTodos(userId, newTodos);
    setNextTodoId(nextTodoId+1)

  }

  const newTodoDialog = (toOpen) => {
    setOpenNewTodoDialog(toOpen);
    setShowTodosList(!toOpen);
  }

  useEffect(()=> {
    setNextTodoId((todos.length)+1);
  },[todos])


  return (
    <div className='right-user-data-lists'>
      <div>
      {showTodosList && (
        <div className='right-lists-title'>
          <h3>Todos - User {userId}</h3>
          <button className='right-buttons' onClick={() => newTodoDialog(true)}>Add</button>
        </div>
      )}
      {showTodosList && todos && todos.map((todo) => (
        <Todo 
          key={todo.id}
          todo={todo} 
          onMarkCompleted={() => handleMarkCompleted(todo.id)} 
        />
      ))}
      </div>

      <div>
        {openNewTodoDialog && <NewTodo
                            userId={userId}
                            addNewTodoCallback={addNewTodo}
                            cancelCallback={newTodoDialog}
                            nextTodoId={nextTodoId}
                            />}
      </div>
    </div>
    
  );
}

export default TodosList;