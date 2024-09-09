import React from 'react'

const Post = ({post}) => {
  return (
    <div className='right-user-data-single'>
      <label className='label-text' >Title:</label>
      {post.title}<br/>

      <label className='label-text'>Body:</label>
      {post.body}
    </div>
  )
}

export default Post