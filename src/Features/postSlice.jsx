import { createSlice } from '@reduxjs/toolkit'
import { auth } from '../firebase'

export const postSilce = createSlice({
  name: 'post',
  initialState: {posts : null},
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    addPost: (state, action) => {
      const post = action.payload.post
      state.posts.push(post)
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
    incDecLike: (state, action) => {
      const postId = action.payload.id, val = action.payload.liked === 'liked' ? -1 : 1
      console.log(postId, val);
      state.posts.forEach((post) => {
        if (post._id === postId) {
          post.noOfLikes += val
        }
      })
    },
  },
})

export const {incDecLike, addTheComment, deleteTheComment, setPosts, addPost } = postSilce.actions

export default postSilce.reducer
