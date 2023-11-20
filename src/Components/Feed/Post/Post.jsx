import React, { useState } from 'react'
import Helper from './Helper'
import Comment from '../Comment/Comment'
import "./Post.css"
// import { Link } from 'react-router-dom'

export default function Post({ post }) {
  const {
    likeDislikePost,
    addComment,
    deleteComment,
    liked,
    text,
    setText, 
    comments,
    fetchComments,
  } = Helper({ post })
  return <>
      {/* <Link to={`/profile/${post.user._id}`}>
      <button>{post.user.name}</button>
      </Link> */}
      <h3>{post.title}</h3>
        <img src={post.imageUrl} alt="" />
      <div>{post.description}</div>
      <div>
        <button className='btnCSS' onClick={likeDislikePost}>{liked === 'liked' ? 'dislike' : 'like'}</button>
        <span>{post.noOfLikes}</span>
      </div >
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button className='btnCSS' onClick={() => addComment(text, post._id)}>add comment</button>
      </div>
      <div>
        <button className='btnCSS' onClick={() => fetchComments(post._id)}>fetch comments</button>
        <div>
          {
            comments.map((comment) => {
              return <div key={comment._id}>
                <Comment text={text} comment={comment} deleteComment={deleteComment}/>
              </div>
            })
          }
        </div>
      </div>
  </>
}