import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from '../../Features/postSlice'
import axios from 'axios'
import Post from './Post/Post'
import './Feed.css'

const Feed = () => {
  const posts = useSelector((state) => state.post.posts)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios.get(process.env.REACT_APP_SERVER + '/post/')
        return dispatch(setPosts(posts.data))
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='feed'>
      {posts === null ? (
        <div className='lds-dual-ring'></div>
      ) : (
        posts.map((post) => {
          return (
            <div key={post._id} className='post'>
              <Post post={post} />
            </div>
          )
        })
      )}
    </div>
  )
}

export default Feed
