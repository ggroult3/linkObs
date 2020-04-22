console.log('Hello, world!')

const socket = io.connect('http://localhost:8080')

socket.emit("nouveau_client")

socket.on('new_connection', function (){
    console.log("Un nouveau client s'est connecté")
})
