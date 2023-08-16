import { createSlice } from '@reduxjs/toolkit'
import { auth } from '../../firebase'

export const postSilce = createSlice({
  name: 'post',
  initialState: [],
  reducers: {
    setPosts: (state, action) => {
        state.push(action.payload)
    },
    emptyPosts: (state) => {
      state.length = 0;
    },
    addTheComment: (state, action) => {
      const postId = action.payload.id,
        comment = action.payload.comment
      state.forEach((post) => {
        if (post.id === postId) {
          post.comments.push(comment)
        }
      })
    },
    deleteTheComment: (state, action) => {
      const postId = action.payload.id,
        comment = action.payload.comment
      console.log(postId, comment)
      state.forEach((post) => {
        if (post.id === postId) {
          post.comments = post.comments.filter((commented) => commented !== comment)
        }
      })
    },
    likeThePost: (state, action) => {
      const postId = action.payload.id
      state.forEach((post) => {
        if (post.id === postId) {
          post.likes.push(auth.currentUser.uid)
        }
      })
    },
    disLikeThePost: (state, action) => {
      const postId = action.payload.id
      state.forEach((post) => {
        if (post.id === postId) {
          post.likes = post.likes.filter((like) => like !== auth.currentUser.uid)
        }
      })
    },
  },
})

export const {emptyPosts, likeThePost, disLikeThePost, addTheComment, deleteTheComment, setPosts } =
  postSilce.actions

export default postSilce.reducer
