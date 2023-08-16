import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from 'mdb-react-ui-kit'
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
      setFollowed(post.followers.includes(auth.currentUser.uid))
    }
    fetchUser()
  }, [])
  const documentUpdate = async (id, updateQuery) => {
    const postRef = doc(db, 'users', id)
    await updateDoc(postRef, updateQuery)
  }
  const followUser = async () => {
    await documentUpdate(urlId, { followers: arrayUnion(auth.currentUser.uid) })
    await documentUpdate(auth.currentUser.uid, { followings: arrayUnion(urlId) })
    setUserProfile((prev) => {
      return {
        ...prev,
        followers: [...prev.followers, auth.currentUser.uid],
      }
    })
    setFollowed(true)
  }
  const unFollowUser = async () => {
    await documentUpdate(urlId, { followers: arrayRemove(auth.currentUser.uid) })
    await documentUpdate(auth.currentUser.uid, { followings: arrayRemove(urlId) })
    setUserProfile((prev) => {
      return { ...prev, followers: prev.followers.filter((user) => user !== auth.currentUser.uid) }
    })
    setFollowed(false)
  }
  return (
    <>
      {userProfile && (
        <div className='gradient-custom-2'>
          <MDBContainer className='py-5 h-100'>
            <MDBRow className='justify-content-center align-items-center h-100'>
              <MDBCol lg='9' xl='7'>
                <MDBCard>
                  <div
                    className='rounded-top text-white '
                    style={{ backgroundColor: '#000', height: '200px' }}
                  >
                    <div className='mt-5 d-flex flex-column' style={{ width: '150px' }}></div>
                    <div
                      className='ps-4'
                      style={{ marginTop: '25px', display: 'flex', flexDirection: 'column'}}
                    >
                      <div style={{display:'flex', alignItems:'center'}}>       
                      <MDBTypography style={{marginRight:'20px'}} tag='h5'>{userProfile.name}</MDBTypography>               
                      { auth.currentUser.uid !== urlId && <div> {followed ? <MDBBtn onClick={unFollowUser}>Following</MDBBtn> : <MDBBtn onClick={followUser}>Follow User</MDBBtn>}</div>}
                      </div>

                      <div style={{ display: 'flex' }}>


                        <div>
                          <MDBCardText className='mb-1 h5'>{userProfile.followers.length}</MDBCardText>
                          <MDBCardText className='small text-muted mb-0'>Followers</MDBCardText>
                        </div>
                        <div>
                          <MDBCardText className='mb-1 px-1 h5'>{userProfile.followings.length}</MDBCardText>
                          <MDBCardText className='small text-muted px-1 mb-0'>
                            Following
                          </MDBCardText>
                        </div>
                      </div>
                    </div>
                  </div>
                  <MDBCardBody className='text-black p-4'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <MDBCardText className='lead fw-normal mb-0'>Recent photos</MDBCardText>
                    </div>
                    <MDBRow>
                    {
                    userProfile.posts.map((post) => {
                      return <MDBCol className="mb-2">
                        <MDBCardImage src={post.imageurl}
                          alt="image 1" style={{width: '200px', height:'150px'}} className="rounded-3" />
                      </MDBCol>
                    })
                  }
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )}
    </>
  )
}
