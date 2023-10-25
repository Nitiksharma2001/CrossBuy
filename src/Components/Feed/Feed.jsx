import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from '../../Features/postSlice'
import axios from 'axios'
import Post from './Post/Post'
import './Feed.css'
import { setUser } from '../../Features/userSlice'

const Feed = () => {
  const posts = useSelector((state) => state.post.posts)
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'))
    if (!user && localUser) {
      dispatch(setUser(localUser))
    }
    const fetchData = async () => {
      try {
        const posts = await axios.get(process.env.REACT_APP_SERVER + '/post/allposts')
        return dispatch(setPosts(posts.data))
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [user])
  return (
    <div className='feed'>
      {posts === null ? (
        <div className='lds-dual-ring'></div>
      ) : (
        posts.map((post) => {
          return (
            <div key={post.id}>
              <Post post={post} />
            </div>
          )
        })
      )}
    </div>
  )
}

export default Feed
