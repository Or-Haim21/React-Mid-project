import {useState} from 'react'

const NewTodo = ({userId, addNewTodoCallback, cancelCallback, nextTodoId}) => {

  const [newTodo, setNewTodo] = useState({id: 0,title:'', completed: false});
  const addNewTodo = () => {
    if(newTodo.title !== ''){
      newTodo.id = nextTodoId;
      addNewTodoCallback(userId,newTodo);
      setNewTodo({id: 0, title:'', completed: false});
    }
    else{
      alert('Please enter a title!');
    }
  }

  const cancel = () => {
    cancelCallback(false);
  }

  return (
    <div>
      <h3>New Todo - User {userId}</h3>
      <label className='label-text'>Title: </label> 
      <input type="text" value={newTodo.title} onChange={e => setNewTodo({...newTodo,title:e.target.value})}/><br/> 
      <div className='button-container'>
        <div className='right-buttons'>
          <button onClick={cancel}>Cancel</button>
          <button onClick={addNewTodo}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default NewTodo