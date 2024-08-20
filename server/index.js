const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)
const io = new Server(server , {
   cors:{
      origin:'http://localhost:3000',
      methods:['GET','POST']
   }
})


io.on("connection" , (socket)=>{
   // console.log("user connected : "+ socket.id);
   socket.on("send_message" , (data)=>{
      // socket.broadcast.emit("receive_message" , data)
      socket.to(data.room).emit('receive_message'  , data)
   })

   socket.on("join_room" , (data)=>{
      socket.join(data)
   })
   
})

server.listen(8000 , ()=>{
   console.log("SERVER IS RUNNING ON PORT 8000 :");
})