const io = require("socket.io")(8000,{
      cors:"http://127.0.0.1:5500/"                   // cross origin resource sharing 
      //cors: "*"
})

let users = {}
io.on("connection",(socket)=>{
    socket.on("joined",(name)=>{
       if(name == "" || name == null || name=="null"){}
       else{
             users[socket.id] = name
             socket.broadcast.emit("new-user-joined",name)
             console.log(users)
       }
    })
    socket.on("send",(message)=>{
        socket.broadcast.emit("recieve",{name:users[socket.id],message:message})
    })
    socket.on("disconnect",()=>{
        if(users[socket.id] == "" || users[socket.id] == null || users[socket.id]=="null"){}
        else{
        socket.broadcast.emit("left",users[socket.id])
        delete users[socket.id]
        }
    })
})