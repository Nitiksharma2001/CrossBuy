import Helper from './Helper'
export default function Postadd() {
  const {data, changeVal, submitData} = Helper()
  return <>
    <div>
      <div>
        title <input type="text" name='title' value={data.title} onChange={changeVal}/>
        description <input type="text" name='description' value={data.description} onChange={changeVal}/>
        imageUrl <input type="text" name='imageUrl' value={data.imageUrl} onChange={changeVal}/>
      </div>
      <button onClick={submitData}>submit</button>
    </div>
  
  </>
}
