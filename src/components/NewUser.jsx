import { useState } from 'react'

const NewUser = ({cancelCallback, addNewUserCallback}) => {

  const [user,setUser] = useState({name:'', email:''});

  const addNewUser = () => {
      if(user.name !== ''){
        addNewUserCallback(user);
        setUser({name:'',email:''});
      }
      else { 
        alert('Please Enter Name!');
      }
    }

  const cancel = () => {
    cancelCallback(false);
  }

  return (
    <div  className='new-user' >
      <label className='label-text'>Add New User</label><br/><br/>

      <label className='label-text'>Name: </label> 
      <input type="text" value={user.name} onChange={e => setUser({...user,name:e.target.value})}/><br/>

      <label className='label-text'>Email: </label> 
      <input type="text" value={user.email} onChange={e => setUser({...user,email:e.target.value})}/><br/>

      <div className='button-container'>
        <div className='right-buttons'>
          <button onClick={cancel}>Cancel</button>
          <button onClick={addNewUser}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default NewUser