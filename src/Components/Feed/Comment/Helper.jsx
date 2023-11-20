import { useState } from "react"
import { useSelector } from "react-redux"

const Helper = () => {
  const [replies, setReplies] = useState([])
  const baseUrl = process.env.REACT_APP_SERVER
  const user = useSelector(state => state.user.user)
  
  const fetchReplies = async (commentId) => {
    const data = await fetch(`${process.env.REACT_APP_SERVER}/reply/${commentId}`)
    const replies = await data.json()
    setReplies(replies)
  }
  const addReply = async (replyValue, commentId) => {
    if (replyValue === '') {
      return
    }
    const resp = await fetch(`${baseUrl}/reply/${commentId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.token}`,
      },
      body: JSON.stringify({ replyValue }),
    })
    const { reply } = await resp.json()
    setReplies([...replies, reply])
  }
  const deleteReply = async (replyId) => {
    const resp = await fetch(`${baseUrl}/reply/${replyId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.token}`,
      },
    })
    await resp.json()
    setReplies(prev => prev.filter(reply => reply._id != replyId))
  }

  const updateReply = async (replyValue, replyId) => {
    if (replyValue === '') {
      return
    }
    const resp = await fetch(`${baseUrl}/reply/${replyId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.token}`,
      },
      body: JSON.stringify({ replyValue }),
    })
    const newReply = await resp.json()
    setReplies(prev => prev.map(reply => {
      if(reply._id === replyId){
        return newReply.reply
      }
      return reply
    }))
  }
  
  return{
    replies,
    fetchReplies,
    addReply,
    updateReply,
    deleteReply
  }
}
export default Helper
