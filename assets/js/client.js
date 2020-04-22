console.log('Hello, world!')

const socket = io.connect('https://linkobs.herokuapp.com/')

socket.emit("nouveau_client")

socket.on('new_connection', function (){
    console.log("Un nouveau client s'est connecté")
})

function randint(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

document.querySelector('#updater').addEventListener("click",function(){
    let marker1 = {
        name : 'E5',
        position : {
            x : randint(-100,100),
            y : randint(-100,100),
            z : randint(-100,100)
        },
        orientation : randint(0,360),
        speed : randint(0,100),
        stamina : randint(0,100)
    }
    let marker2 = {
        name : '55',
        position : {
            x : randint(-100,100),
            y : randint(-100,100),
            z : randint(-100,100)
        },
        orientation : randint(0,360),
        speed : randint(0,100),
        stamina : randint(0,100)
    }
    let marker3 = {
        name : 'D5',
        position : {
            x : randint(-100,100),
            y : randint(-100,100),
            z : randint(-100,100)
        },
        orientation : randint(0,360),
        speed : randint(0,100),
        stamina : randint(0,100)
    }
    let data = {marker1,marker2,marker3}
    console.log(data)
})