console.log('Hello, world!')

const socket = io.connect('https://linkobs.herokuapp.com/')

socket.emit("nouveau_client")

socket.on('new_connection', function (){
    console.log("Un nouveau client s'est connecté")
})
