import './App.css'
import Feed from './Components/Feed/Feed'
import Signin from './Components/Auth/Signin/Signin'
import Signup from './Components/Auth/Signup/Signup'
import PostAdd from './Components/PostAdd/PostAdd'
import Profile from './Components/Profile/Profile'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './Features/userSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'))
    if (user === null && localUser) {
      dispatch(setUser(localUser))
    }
  }, [user])
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/addpost" element={<PostAdd />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
