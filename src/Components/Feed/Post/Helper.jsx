import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { incDecLike } from '../../../Features/postSlice'

const Feed = ({ post, setPosts }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.user.user)
  const baseUrl = process.env.REACT_APP_SERVER
  const [text, setText] = useState('')
  const [comments, setComments] = useState([])

  const [liked, setLiked] = useState('dislike')
  useEffect(() => {
    if(user){
      fetch(`${baseUrl}/post/liked/${post._id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${user.token}`,
        },
      })
      .then(resp => resp.json())
      .then(data => {
         setLiked(data.message)
      })
    }
  })
  
  const likeDislikePost = async () => {
    if(!user){
      return navigate('/signin')
    }

    const val = liked === 'liked'
    const resp = await fetch(`${baseUrl}/post/${liked === 'liked' ? 'dislike' : 'like'}/${post._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.token}`,
      },
    })
    const like = await resp.json()
    dispatch(incDecLike({id: post._id, liked}))
    setLiked(liked === 'liked' ? 'notliked' : 'liked')
  }

  const addComment = async (commentValue, postId) => {
    if(!user){
      return navigate('/signin')
    }
    if (text === '') {
      return
    }
    const resp = await fetch(`${baseUrl}/comment/${postId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.token}`,
      },
      body: JSON.stringify({ commentValue }),
    })
    const newComment = (await resp.json()).comment
    setComments((prev) => [...prev, { ...newComment, user }])
  }
  const fetchComments = async (post) => {
    const comments = await axios.get(process.env.REACT_APP_SERVER + '/comment/'+post)
    setComments(comments.data)  
  }
  const deleteComment = async (commentId) => {
    if(!user){
      return navigate('/signin')
    }
    const resp = await fetch(`${baseUrl}/comment/${commentId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.token}`,
      },
    })
    setComments((prev) => prev.filter(comment => comment._id !== commentId))
  }
  return {
    deleteComment,
    text,
    setText,
    comments,
    liked,
    likeDislikePost, 
    addComment,
    fetchComments,
  }
}

export default Feed
