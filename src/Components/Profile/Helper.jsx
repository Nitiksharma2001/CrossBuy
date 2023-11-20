import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Post() {
  const [userProfile, setUserProfile] = useState(null)
  const urlId = useParams().id

  const baseUrl = process.env.REACT_APP_SERVER
  useEffect(() => {
    fetch(`${baseUrl}/user/${urlId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(data => {
       setUserProfile(data)
    })
  }, [])
  
  return { userProfile }
}
