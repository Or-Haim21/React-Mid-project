import { useState, useEffect } from 'react';
import { getAllUsers, getAllTodos, getAllPosts } from './Utils';
import UsersList from './UsersList';

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const updateUsers = (data) => {
    setUsers(data);
  }

  // Fetch all the data from the server
  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData } = await getAllUsers();
      setAllUsers(usersData);

      const { data: todosData } = await getAllTodos();
      setAllTodos(todosData);

      const { data: postsData } = await getAllPosts();
      setAllPosts(postsData);
    }

    fetchData();
  }, []);

  // Prepares the user data in an object - {id, name, email, street, city, zipcode, todos[], posts[]}
  useEffect(() => {
    const usersFinalData = allUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      street: user.address?.street,
      city: user.address?.city,
      zipcode: user.address?.zipcode,
      todos: allTodos.filter(todo => todo.userId === user.id).slice(0, 3),
      posts: allPosts.filter(post => post.userId === user.id).slice(0, 3),

    }));

    setUsers(usersFinalData);
  }, [allUsers, allTodos, allPosts]);

  return (
    <div>
      <UsersList users={users} 
        updateUsers={updateUsers}
      />
    </div>
  );
}

export default MainPage;
