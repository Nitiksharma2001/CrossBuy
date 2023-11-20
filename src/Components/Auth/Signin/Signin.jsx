import Helper from "./Helper"
import "./Signin.css"

export default function Signin() {
  const {data, changeVal, submitData} = Helper()
  return <>
    <div className='top-main'>
      <div className="elements">
        <div className="element">
          Email:-- <input type="text" name='email' value={data.email} onChange={changeVal}/>
        </div>
        <div className="element">
          Password:-- <input type="password" name='password' value={data.password} onChange={changeVal}/>
        </div>
      <button className="btnCSS" onClick={submitData}>Submit</button>
      </div>
    </div>
  
  </>
}
