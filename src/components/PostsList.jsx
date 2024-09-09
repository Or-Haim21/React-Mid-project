import {useState, useEffect} from 'react';
import Post from './Post';
import NewPost from './NewPost';

const PostsList = ({ posts, userId, updateUserPosts}) => { 
  const [openNewPostDialog, setOpenNewPostDialog] = useState(false);
  const [showTodosList, setShowTodosList] = useState(true);
  const [nextPostId, setNextPostId] = useState();

  const addNewPost = (userId, post) => {

    const newPosts = [...posts,post];
    updateUserPosts(userId, newPosts);
    setNextPostId(nextPostId+1)

  }

  const newPostDialog = (toOpen) => {
    setOpenNewPostDialog(toOpen);
    setShowTodosList(!toOpen);
  }
  
  useEffect(()=> {
    setNextPostId((posts.length)+1);
  },[posts])

  return (
   <div className='right-user-data-lists'>
      <div>
      {showTodosList && (
        <div className='right-lists-title'>
        <h3>Posts - User {userId}</h3>
        <button className='right-buttons' onClick={() => newPostDialog(true)}>Add</button>
      </div>
      )}
      {showTodosList && posts && posts.map(post => (
        <Post 
          key={post.id} 
          post={post} 
        />
      ))}
      </div>

      <div>
        {openNewPostDialog && <NewPost
                                userId={userId}
                                addNewPostCallback={addNewPost}
                                cancelCallback={newPostDialog}
                                nextPostId={nextPostId}
                            />}
      </div>
    </div>
  );
}

export default PostsList;
