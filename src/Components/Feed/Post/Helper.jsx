import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { likeThePost, disLikeThePost, addTheComment, deleteTheComment } from '../../../Features/postSlice'

const Feed = ({ post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const baseUrl = process.env.REACT_APP_SERVER
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState(false)
  const documentUpdate = async (updateQuery) => {
    if (user === null) {
      return navigate('/signin')
    }
    const postRef = doc(db, 'posts', post.id)
    await updateDoc(postRef, updateQuery)
  }
  const replyUpdate = async (updateQuery) => {
    if (user === null) {
      return navigate('/signin')
    }
    const postRef = doc(db, 'posts', post.id)
    console.log(postRef.data())
  }
  const addComment = async (commentValue, post) => {
    if (user === null) {
      return navigate('/signin')
    }
    if (comment === '') {
      return
    }
    const resp = await fetch(baseUrl + '/comment/addcomment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.token}`,
      },
      body: JSON.stringify({ commentValue, post }),
    })
    const newComment = (await resp.json()).comment
    setComments((prev) => [...prev, { ...newComment, user }])
  }
  const fetchComments = async (post) => {
    const comments = await axios.get(process.env.REACT_APP_SERVER + '/comment/allcomments/'+post)
    setComments(comments.data)
  }
  const likePost = async () => {
    if (user === null) {
      return navigate('/signin')
    }
    await documentUpdate({ likes: arrayUnion(auth.currentUser.uid) })
    dispatch(likeThePost({ id: post.id }))
    setLiked(true)
  }
  const disLikePost = async () => {
    if (user === null) {
      return navigate('/signin')
    }
    await documentUpdate({ likes: arrayRemove(auth.currentUser.uid) })
    dispatch(disLikeThePost({ id: post.id }))
    setLiked(false)
  }
  const deleteComment = async (commentId) => {
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
    disLikePost,
    likePost,
    replyUpdate,
    comment,
    comments,
    setComment,
    addComment,
    fetchComments,
    liked,
  }
}

export default Feed
