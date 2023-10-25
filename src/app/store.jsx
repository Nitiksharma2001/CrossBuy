import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../Features/postSlice'
import userReducer from '../Features/userSlice'
export default configureStore({
  reducer: {
    post: postReducer,
    user: userReducer
  },
})
