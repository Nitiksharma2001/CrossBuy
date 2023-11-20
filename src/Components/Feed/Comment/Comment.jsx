import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Helper from "./Helper"

const Comment = ({ text, comment, deleteComment }) => {
  
  const user = useSelector((state) => state.user.user)
  const { _id, commentValue } = comment
  const { name } = comment.user
  const userId = comment.user._id
  
  const {fetchReplies, replies, addReply, updateReply, deleteReply} = Helper()
  const btnCSS = {
    backgroundColor:'white', 
    border: '1px solid black', 
    padding: '1px 4px', 
    borderRadius: '3px',
    fontSize: '13px',
    fontWeight: 'bold',
    marginRight: '2px'
  }
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div><b>{`@${name}: `}</b><span>{commentValue}</span></div>
        <div>
          <button style={btnCSS} onClick={() => addReply(text, _id)}>Reply</button>
          <button style={btnCSS} onClick={() => fetchReplies(_id)}>Replies</button>
          <button style={btnCSS} onClick={() => deleteComment(_id)}>Delete</button>
        </div>
      </div>
      {
        replies.map((reply) => {
            return (
            <div key={reply._id} style={{marginLeft: '30px', display:'flex', justifyContent:'space-between'}}>
              <div>
              <b>{`@${reply.user.name}: `}</b><span>{reply.replyValue}</span>

              </div>
              <div>
              <button style={btnCSS} onClick={() => deleteReply(reply._id)}>Delete</button>
              <button style={btnCSS} onClick={() => updateReply(text, reply._id)}>Update</button>
            </div>
            </div>
            )
        })
      }
    </div>
  )
}
export default Comment
