let socket = io("http://localhost:8000")

var  name = prompt("Enter Your Name to Join the Chat :")
socket.emit("joined",name)

var first = document.querySelector(".first")
function generateMessage(message,side){
    var messageDiv = document.createElement("div")
    messageDiv.classList.add("alert")
    if(side == "left"){
        messageDiv.classList.add("alert-primary")
        messageDiv.classList.add("left")
    
    }
    else if(side == "right"){
        messageDiv.classList.add("alert-success")
        messageDiv.classList.add("right")
    }
    else {
        messageDiv.classList.add("alert-danger")
        messageDiv.classList.add("center")
  }
       messageDiv.innerHTML = message
       first.append(messageDiv)
}
socket.on("new-user-joined",(name)=>{
    generateMessage(`${name} Joined The Chat`,"center")
})
socket.on("left",(name)=>{
    generateMessage(`${name} Left The Chat`,"center")
})

function sendMessage(){
    var input = document.getElementById("message")
    generateMessage(`${input.value}: You`,"right")
    socket.emit("send",input.value)
    input.value = ""
    
}

socket.on("recieve",({message,name})=>{
    generateMessage(`${name}: ${message}`,"left")
})