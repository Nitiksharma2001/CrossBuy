import Helper from './Helper'
export default function Postadd() {
  const {data, changeVal, submitData} = Helper()
  return <>
    <div className='top-main'>
      <div className="elements">
        <div className="element">
          Title:-- <input type="text" name='title' value={data.title} onChange={changeVal}/>
        </div>
        <div className="element">
          Description:-- <input type="text" name='description' value={data.description} onChange={changeVal}/>
        </div>
        <div className="element">
          ImageURL:-- <input type="text" name='imageUrl' value={data.imageUrl} onChange={changeVal}/>
        </div>
      <button className="btnCSS" onClick={submitData}>Submit</button>
      </div>
    </div>
    <div>
    </div>
  
  </>
}
