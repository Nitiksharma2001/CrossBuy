import React from 'react'
import { useParams } from 'react-router-dom'
import { auth } from '../../firebase'
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
import Helper from './Helper'
export default function Post() {
  const urlId = useParams().id
  const { followUser, unFollowUser, userProfile, followed } = Helper()
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
                    <div
                      className='mt-5 d-flex flex-column'
                      style={{ width: '150px' }}
                    ></div>
                    <div
                      className='ps-4'
                      style={{
                        marginTop: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <MDBTypography style={{ marginRight: '20px' }} tag='h5'>
                          {userProfile.name}
                        </MDBTypography>
                        {auth.currentUser && auth.currentUser.uid !== urlId && (
                          <div>
                            {' '}
                            {followed ? (
                              <MDBBtn onClick={unFollowUser}>Following</MDBBtn>
                            ) : (
                              <MDBBtn onClick={followUser}>Follow User</MDBBtn>
                            )}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex' }}>
                        <div>
                          <MDBCardText className='mb-1 h5'>
                            {userProfile.followers.length}
                          </MDBCardText>
                          <MDBCardText className='small text-muted mb-0'>
                            Followers
                          </MDBCardText>
                        </div>
                        <div>
                          <MDBCardText className='mb-1 px-1 h5'>
                            {userProfile.followings.length}
                          </MDBCardText>
                          <MDBCardText className='small text-muted px-1 mb-0'>
                            Following
                          </MDBCardText>
                        </div>
                      </div>
                    </div>
                  </div>
                  <MDBCardBody className='text-black p-4'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <MDBCardText className='lead fw-normal mb-0'>
                        Recent photos
                      </MDBCardText>
                    </div>
                    <MDBRow>
                      {userProfile.posts.map((post) => {
                        return (
                          <MDBCol className='mb-2'>
                            <MDBCardImage
                              src={post !== undefined && post.imageurl}
                              alt='image 1'
                              style={{ width: '200px', height: '150px' }}
                              className='rounded-3'
                            />
                          </MDBCol>
                        )
                      })}
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
