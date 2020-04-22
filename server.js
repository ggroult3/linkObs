const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)
const fs = require('fs')

const PORT = process.env.PORT || 3000

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

app.get('/getData/:scenario',function(req,res){
    scenario = req.params.scenario
    pathURL = __dirname + '/assets/json/' + scenario + '.json'
    res.status(200).sendFile(pathURL)
})

io.sockets.on('connection', function(socket){
    socket.on('nouveau_client', function(){
        console.log("New online client !")
        socket.broadcast.emit('new_connection')
    })
    socket.on('update soccer',function(markers){
        let data = JSON.stringify(markers)
        fs.writeFileSync('/assets/json/foot.json',data)
    })
})

console.log('\nServer launched !')
server.listen(PORT,() => console.log('Listening on ${PORT}'))