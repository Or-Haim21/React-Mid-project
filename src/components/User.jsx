import { useEffect, useState } from 'react';
import OtherData from './OtherData';

const RED_BORDER = '2px solid #a8c66c';
const GREEN_BORDER = '2px solid #f57e7e';
const selectedBackgroundColor = '#d9d2bf';
const unselectedBackgroundColor = '#f5f0e1';

const User = ({ user, updateUserCallback, deleteUserCallback, setSelectedUserId, isSelected}) => { 

  const [userData, setUserData] = useState();
  const [showOtherData, setShowOtherData] = useState(false);
  const [allTodosCompleted, setAllTodosCompleted] = useState();
  const [borderColor, setBorderColor] = useState('');
  const userDesignChanging = {border: borderColor, backgroundColor: isSelected ? selectedBackgroundColor : unselectedBackgroundColor}

  //Set the allTodoCompleted according to the list 
  useEffect(() => {
    setUserData(user);
    const allCompleted = user.todos?.every(todo => todo.completed);
    setAllTodosCompleted(allCompleted);
  }, [user.todos]);

  //Set the border color according to allTodoCompleted
  useEffect(() => {
    setBorderColor(allTodosCompleted ? RED_BORDER : GREEN_BORDER);
  }, [allTodosCompleted]);

  const openOtherData = () => {
    setShowOtherData(true);
  };
  
  const selectUser = () => {
    setSelectedUserId(user.id); 
  }

  const closeOtherData = () => {
    setShowOtherData(false);
  };

  // In every change in name or email inputs, update the user data object
  const updateUserData = (data) => {
    setUserData({ ...userData, ...data });
  }

  // Update the user data changed in the user list component
  const saveTheUpdateUserData = () => {
    updateUserCallback(userData);
  }

  const deleteUser = () => {
    deleteUserCallback(user.id);
  }

  return (
    <div className='user-class' style={userDesignChanging} >  
      <label className='label-text' onClick={selectUser}>ID: </label>{user.id} <br /> 

      <label className='label-text'>Name: </label>
      <input type="text" defaultValue={user.name} onChange={e => setUserData({ ...userData, name: e.target.value })} /><br />

      <label className='label-text'>Email: </label> 
      <input type="text" defaultValue={user.email} onChange={e => setUserData({ ...userData, email: e.target.value })} /><br />
      <div>
        {showOtherData && <OtherData 
                            user={user} 
                            callback={updateUserData} 
                          />}
      </div>
      <div className='button-container'>
        <button className='other-data-button' onMouseOver={openOtherData} onClick={closeOtherData}>Other Data</button>
        <div className='right-buttons'>
          <button onClick={saveTheUpdateUserData}>Update</button>
          <button onClick={deleteUser}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default User;
