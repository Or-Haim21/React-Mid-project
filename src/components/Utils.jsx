import axios from 'axios';
const USERS_URL  = 'https://jsonplaceholder.typicode.com/users';
const TODOS_URL  = 'https://jsonplaceholder.typicode.com/todos';
const POSTS_URL  = 'https://jsonplaceholder.typicode.com/posts';

const getAllUsers = () => axios.get(USERS_URL);
const getAllTodos = () => axios.get(TODOS_URL)
const getAllPosts = () => axios.get(POSTS_URL)



export {getAllUsers, getAllTodos, getAllPosts}