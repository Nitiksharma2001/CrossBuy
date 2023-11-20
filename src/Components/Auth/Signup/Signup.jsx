import Helper from "./Helper"

export default function Signup() {
  const {data, changeVal, submitData} = Helper()
  return <>
    <div className='top-main'>
      <div className="elements">
        <div className="element">
          Name <input type="text" name='name' value={data.name} onChange={changeVal}/>
        </div>
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
