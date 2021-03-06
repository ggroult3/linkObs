const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)
const fs = require('fs')
const cors = require('cors')

const PORT = process.env.PORT || 3000

app.use(cors())

app.get('/',function(req,res){
    res.status(200).sendFile(__dirname + '/assets/html/index.html')
    console.log('\nConnected to the webapp !\n')
})

app.use('/',express.static(__dirname + '/assets'))

app.get('/assets/:dir/:file',function(req,res){
    dir = req.params.dir
    file = req.params.file
    pathURL = __dirname + '/assets/' + dir + '/' + file
    res.status(200).sendFile(pathURL)
})

app.get('/sendData/:scenario',function(req,res){
    scenario = req.params.scenario
    pathURL = __dirname + '/assets/json/' + scenario + '.json'
    res.status(200).sendFile(pathURL)
})

app.post('/getData', function(req,res){
    scenario = req.body.name
    pathURL = __dirname + '/assets/json/' + scenario + '.json'
    data = JSON.stringify(req.body.data)
    fs.writeFile(pathURL, data,(err) => {
        if (err) throw err;
        console.log('Data written to file');
    })
})

io.sockets.on('connection', function(socket){
    socket.on('nouveau_client', function(){
        console.log("New online client !")
        socket.broadcast.emit('new_connection')
    })
    socket.on('update soccer',function(markers){
        let data = JSON.stringify(markers)
        console.log(data)
        fs.writeFile(__dirname + '/assets/json/foot.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        })
        socket.broadcast.emit('update data')
    })
})

console.log('\nServer launched !')
server.listen(PORT,() => console.log('Listening on ${PORT}'))