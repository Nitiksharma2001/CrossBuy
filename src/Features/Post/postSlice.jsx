import { createSlice } from '@reduxjs/toolkit'
import { auth } from '../../firebase'

export const postSilce = createSlice({
  name: 'post',
  initialState: {posts : null},
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    addTheComment: (state, action) => {
      const postId = action.payload.id, comment = action.payload.comment
      state.posts.forEach((post) => {
        if (post.id === postId) {
          post.comments.push(comment)
        }
      })
    },
    deleteTheComment: (state, action) => {
      const postId = action.payload.id, comment = action.payload.comment
      console.log(postId, comment);
      state.posts.forEach((post) => {
        if (post.id === postId) {
          post.comments = post.comments.filter(commented => commented.id !== comment.id)
        }
      })
    },
    likeThePost: (state, action) => {
      const postId = action.payload.id
      state.posts.forEach((post) => {
        if (post.id === postId) {
          post.likes.push(auth.currentUser.uid)
        }
      })
    },
    disLikeThePost: (state, action) => {
      const postId = action.payload.id
      state.posts.forEach((post) => {
        if (post.id === postId) {
          post.likes = post.likes.filter((like) => like !== auth.currentUser.uid)
        }
      })
    },
  },
})

export const {likeThePost, disLikeThePost, addTheComment, deleteTheComment, setPosts } =
  postSilce.actions

export default postSilce.reducer
