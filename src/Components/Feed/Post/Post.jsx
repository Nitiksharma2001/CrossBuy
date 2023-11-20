import React, { useState } from 'react'
import Helper from './Helper'
import Comment from '../Comment/Comment'
import { Link } from 'react-router-dom'


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
  return <div>
      <Link to={`/profile/${post.user._id}`}>
      <button>{post.user.name}</button>
      </Link>
      <div>{post.title}</div>
      <img src={post.imageUrl} alt="" />
      <div>{post.description}</div>
      <div>
        <button onClick={likeDislikePost}>{liked === 'liked' ? 'dislike' : 'like'}</button>
        <span>{post.noOfLikes}</span>
      </div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => addComment(text, post._id)}>add comment</button>
      <div>
        <button onClick={() => fetchComments(post._id)}>fetch comments</button>
        <div>
          {
            comments.map((comment) => {
              return <Comment text={text} comment={comment} deleteComment={deleteComment}/>
            })
          }
        </div>
      </div>
  </div>
}