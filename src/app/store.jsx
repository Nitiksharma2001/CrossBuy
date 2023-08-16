import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../Features/Post/postSlice'
export default configureStore({
  reducer: {
    post: postReducer
  }
})