import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from '../../Features/Post/postSlice'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'

import Post from './Post'
import './Feed.css'

const Feed = () => {
  const posts = useSelector(state => state.post.posts)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const postCollection = await getDocs(collection(db, 'posts'))
      const data = postCollection.docs.map(async (document) => {
        const userRef = doc(db, 'users', document.data().user)
        const user = await getDoc(userRef)
        const formatDate = document.data().createdat.toDate().toISOString().split('T')[0]
        const post = {
          id: document.id,
          ...document.data(),
          user: { ...user.data(), id: user.id },
          createdat: formatDate,
        }
        return post
      })
      Promise.all(data)
      .then(posts => {
        dispatch(setPosts(posts))
      })
      .catch(err => {
        console.log(err);
      })
    }
    fetchData()
  }, [])
  return (
    <div className='feed'>     
      {posts !== null &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <Post post={post} />
            </div>
          )
        })}
    </div>
  )
}

export default Feed
