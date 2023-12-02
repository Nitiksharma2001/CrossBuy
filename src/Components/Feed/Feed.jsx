import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from '../../Features/postSlice'
import Post from './Post/Post'
import './Feed.css'

const Feed = () => {
  const posts = useSelector((state) => state.post.posts)
  const baseUrl = process.env.REACT_APP_SERVER
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`${baseUrl}/post/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const posts = await resp.json()
        return dispatch(setPosts(posts))
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
