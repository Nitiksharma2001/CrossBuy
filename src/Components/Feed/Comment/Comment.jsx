import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Helper from "./Helper"

const Comment = ({ text, comment, deleteComment }) => {
  
  const { _id, commentValue } = comment
  const { name } = comment.user
  const user = useSelector(state => state.user.user)
  
  const {fetchReplies, replies, addReply, updateReply, deleteReply} = Helper()
  return (
    <>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div style={{width:'200px', wordWrap: 'break-word'}}><b>{`@${name}: `}</b><span>{commentValue}</span></div>
        <div>
          {user && <button className='btnCSS' onClick={() => addReply(text, _id)}>Reply</button> }
          <button className='btnCSS' onClick={() => fetchReplies(_id)}>Replies</button>
          {user && comment.user._id === user._id && <button className='btnCSS' onClick={() => deleteComment(_id)}>Delete</button> }
        </div>
      </div>
      {
        replies.map((reply) => {
            return (
            <div key={reply._id} style={{marginLeft: '30px', display:'flex', justifyContent:'space-between'}}>
              <div  style={{width:'200px', wordWrap: 'break-word'}}>
              <b>{`@${reply.user.name}: `}</b><span>{reply.replyValue}</span>
              </div>
              <div>
              {
                user && reply.user._id === user._id && 
                <> 
                  <button className='btnCSS' onClick={() => deleteReply(reply._id)}>Delete</button>
                  <button className='btnCSS' onClick={() => updateReply(text, reply._id)}>Update</button> 
                </>
              }  
              
            </div>
            </div>
            )
        })
      }
    </>
  )
}
export default Comment
