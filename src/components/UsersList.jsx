import { useEffect, useState } from 'react';
import User from './User';
import NewUser from './NewUser';
import PostsList from './PostsList';
import TodosList from './TodosList';

const UsersList = ({ users, updateUsers }) => {
  const [nextID, setNextID] = useState();
  const [searchFilter, setSearchFilter] = useState('');
  const [usersList, setUsersList] = useState(users);
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);  
  const [userSelected, setUserSelected] = useState(null);   

  // Update user data from the User component.
  const updateUsersList = (updatedUser) => {
    const updatedList = usersList.map(user => user.id === updatedUser.id ? updatedUser : user);
    setUsersList(updatedList);
    updateUsers(updatedList); // Update the parent state directly
  }

  // Delete user - update the local list and the main list in DB
  const deleteUserFromList = (userId) => {
    const updatedList = usersList.filter(user => user.id !== userId);
    setUsersList(updatedList);
    updateUsers(updatedList); 
  }

  // Save the substring for filtering
  const search = (e) => {
    setSearchFilter(e.target.value.toLowerCase());
  }

  const addNewUserDialog = (toOpen) => {
    setSelectedUserId(null);
    setUserSelected(null);
    setOpenNewUserDialog(toOpen);
  }

  const addNewUser = (user) => {
    user.id = nextID;
    setNextID(nextID + 1);
    const newUsersList = [...usersList, user];
    setUsersList(newUsersList);
    updateUsers(newUsersList);
  }

  // Update user todos
  const updateUserTodos = (userId, updatedTodos) => {
    const updatedList = usersList.map(user => 
      user.id === userId ? { ...user, todos: updatedTodos } : user
    );
    setUsersList(updatedList);
    updateUsers(updatedList);
  }

   // Update user posts
   const updateUserPosts = (userId, updatedPosts) => {
    const updatedList = usersList.map(user => 
      user.id === userId ? { ...user, posts: updatedPosts } : user
    );
    setUsersList(updatedList);
    updateUsers(updatedList);
  }
  // Get the selected user object
  useEffect(() => {
    if (selectedUserId) {
      setOpenNewUserDialog(false);
      const user = usersList.find(user => user.id === selectedUserId);
      setUserSelected(user);
    }
  }, [selectedUserId, usersList]); 

  // Update the users list every time the users prop updates.
  useEffect(() => {
    setUsersList(users);
    setNextID(users.length + 1);
  }, [users]);

  // Every time the search filter input changes, update the users list per the filter.
  useEffect(() => {
    setUsersList(users.filter(user => 
      user.name.toLowerCase().includes(searchFilter) || 
      user.email.toLowerCase().includes(searchFilter)
    ));
  }, [searchFilter, users]);

  return (
    <div>
      <div className='users-list-div'>
        <div className="search-container">
          <label className='label-text'>Search: </label>
          <input className='search-input' type="text" onChange={search} />
          <button onClick={() => addNewUserDialog(true)}>Add</button>
        </div>
        {usersList && usersList.map((user) => (
          <User 
            key={user.id} 
            user={user} 
            updateUserCallback={updateUsersList} 
            deleteUserCallback={deleteUserFromList} 
            setSelectedUserId={setSelectedUserId} 
            isSelected={user.id === selectedUserId}
          /> 
        ))}

      </div>
      <div>
        {openNewUserDialog && <NewUser 
                                cancelCallback={setOpenNewUserDialog}
                                addNewUserCallback={addNewUser}
                              />}
        <div>
          {selectedUserId && userSelected && 
            <TodosList 
              todos={userSelected.todos} 
              userId={userSelected.id} 
              updateUserTodos={updateUserTodos}
            />}
        </div>
        <div>
          {selectedUserId && userSelected && <PostsList 
                                              posts={userSelected.posts}
                                              userId={userSelected.id}
                                              updateUserPosts={updateUserPosts} 
                                            />}
        </div>
      </div>
    </div>
  );
}

export default UsersList;