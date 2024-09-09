import React from 'react';

const Todo = ({ todo, onMarkCompleted }) => {
  return (
    <div className='right-user-data-single'>
      <label className='label-text'>Title:</label>
      {todo.title}<br /><br />
      <div className='completed-div'>
        <div>
          <label className='label-text'>Completed:</label>
          {todo.completed.toString()}<br />
        </div>
        {todo.completed ? null : <button className='right-buttons' onClick={onMarkCompleted}>Mark Completed</button>}
      </div>
    </div>
  );
}

export default Todo;
