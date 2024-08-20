import { useEffect ,useState } from "react";
import "./App.css";
import io from "socket.io-client"


const socket = io.connect('http://localhost:8000')


function App() {
  const [value, setValue] = useState("")
  const [data, setData] = useState(null)
  const [room ,setRoom] = useState("")

  const joinRoom = ()=>{
    if(room !== ""){
      socket.emit('join_room' , room)
    }
  }

  const handleChange = (e)=>{
    const val = e.target.value
    setValue(val)
    // setTimeout(() => {
    //   e.target.value = ""
    // }, 5000);
  }

	const handleSendMessage = () => {
    socket.emit('send_message' , {id:1 , room:room, message:value})
  };


  useEffect(()=>{
    socket.on('receive_message' , (data)=>{
      setData(data)
    })
  },[socket])

	return (
		<div className="App-header">
      <div>
        <input type="number" placeholder="enter room number" onChange={(e)=>setRoom(e.target.value)}/>
        <button onClick={joinRoom}>join</button>
      </div>

			
			<div>
				<input onChange={(e)=>handleChange(e)} type="text" class="form-control" placeholder="Message" />
				<button onClick={handleSendMessage}>send</button>
			</div>
      <label htmlFor="">
        {data !== null && data.message}
      </label>
		</div>
	);
}

export default App;
