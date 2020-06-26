console.log('Hello, world!')

const socket = io.connect('https://linkobs.herokuapp.com/') // for local test
// const socket = io.connect('http://localhost:3000') // for heroku deploiement

socket.emit("nouveau_client")

socket.on('new_connection', function (){
    console.log("Un nouveau client s'est connecté")
})

function randint(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

socket.on('update data',function(){
    console.log("Data updated, ready to read by ObservableHQ notebook")
})

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
    let map = {
        title : "Soccer map",
        URL : "https://linkobs.herokuapp.com/assets/img/foot.jpg"
    }
    let markers = {marker1,marker2,marker3,map}
    console.log(markers)
    socket.emit("update soccer",markers)
})