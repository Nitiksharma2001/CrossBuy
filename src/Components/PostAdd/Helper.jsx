import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Helper() {
  const user = useSelector((state) => state.user.user)
  const baseUrl = process.env.REACT_APP_SERVER
  
  const navigate = useNavigate()
  async function addPost(title, description, imageUrl) {
    const resp = await fetch(baseUrl + '/post/addpost', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.token}`,
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    })
    const post = await resp.json()
    console.log(post)
    navigate('/')
  }
  return { addPost }
}
