import { useParams } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Post() {
  const [userProfile, setUserProfile] = useState(null)
  const [followed, setFollowed] = useState(null)
  const urlId = useParams().id
  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, 'users', urlId)
      const user = await getDoc(userRef)
      let posts = await Promise.all(
        user.data().posts.map(async (post) => {
          const postRef = doc(db, 'posts', post)
          return (await getDoc(postRef)).data()
        })
      )
      const post = { ...user.data(), id: user.id, posts: posts }
      setUserProfile(post)
      if (auth.currentUser) {
        setFollowed(post.followers.includes(auth.currentUser.uid))
      }
    }
    fetchUser()
  }, [])
  const documentUpdate = async (id, updateQuery) => {
    const postRef = doc(db, 'users', id)
    await updateDoc(postRef, updateQuery)
  }
  const followUser = async () => {
    await documentUpdate(urlId, { followers: arrayUnion(auth.currentUser.uid) })
    await documentUpdate(auth.currentUser.uid, {
      followings: arrayUnion(urlId),
    })
    setUserProfile((prev) => {
      return {
        ...prev,
        followers: [...prev.followers, auth.currentUser.uid],
      }
    })
    setFollowed(true)
  }
  const unFollowUser = async () => {
    await documentUpdate(urlId, {
      followers: arrayRemove(auth.currentUser.uid),
    })
    await documentUpdate(auth.currentUser.uid, {
      followings: arrayRemove(urlId),
    })
    setUserProfile((prev) => {
      return {
        ...prev,
        followers: prev.followers.filter(
          (user) => user !== auth.currentUser.uid
        ),
      }
    })
    setFollowed(false)
  }
  return { followUser, unFollowUser, userProfile, followed }
}
