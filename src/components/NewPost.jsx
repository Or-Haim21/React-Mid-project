import {useState} from 'react'

const NewPost = ({userId, addNewPostCallback, cancelCallback, nextPostId}) => {

  const [newPost, setNewPost] = useState({id: 0,title:'', body: ''});

  const addNewPost = () => {
    if(newPost.title !== '' && newPost.body !== ''){
      newPost.id = nextPostId;
      addNewPostCallback(userId,newPost);
      setNewPost({id: 0, title:'', body:''});
    }
    else{
      alert('Please enter a title and body!');
    }
  }

  const cancel = () => {
    cancelCallback(false);
  }

  return (
    <div>
      <h3>New Post - User {userId}</h3>
      <label className='label-text'>Title: </label> 
      <input type="text" value={newPost.title} onChange={e => setNewPost({...newPost,title:e.target.value})}/><br/> 

      <label className='label-text'>Body: </label> 
      <input type="text" value={newPost.body} onChange={e => setNewPost({...newPost,body:e.target.value})}/><br/> 

      <div className='button-container'>
        <div className='right-buttons'>
          <button onClick={cancel}>Cancel</button>
          <button onClick={addNewPost}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default NewPost