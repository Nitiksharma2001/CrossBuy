import { useSelector } from "react-redux"
import Helper from "./Helper"

export default function Post() {
  const {userProfile} = Helper()
  const user = useSelector(state => state.user.user)
  return <>
    {
      userProfile && 
      <div>
        <div>
          <h1>{userProfile.name}</h1>
          <h2>{userProfile.email}</h2>
          <div>{user._id === userProfile._id && <button>follow</button>} {userProfile.followers.length}</div>
          <div>followings: {userProfile.followings.length}</div>
        </div>
      </div>
  }
  </>
}
