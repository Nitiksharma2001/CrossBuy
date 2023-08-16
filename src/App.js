import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Feed from './Components/Feed/Feed'
import Signin from './Components/Auth/Signin'
import Signup from './Components/Auth/Signup'
import PostAdd from './Components/PostAdd/PostAdd'
import Profile from './Components/Profile/Profile'
import Card from './Components/Feed/Card'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    // <Card/>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/addpost" element={<PostAdd />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
