const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io').listen(server)

app.use('/',express.static(path.join(__dirname,'/assets')))

app.get('/',function(req,res){
    app.use('/',express.static(path.join(__dirname,'/assets')))
    res.status(200).sendFile(path.join(__dirname,'/assets/html/index.html'))
    console.log('\nConnected to the webapp !\n')
})

app.get('/getData/:scenario', function(req,res){
    const scenario = req.params.scenario
    const pathURL = '/assets/json/' + scenario + '.json'
    res.status(200).sendFile(path.join(__dirname, pathURL))
    console.log('\nData sent')
})

app.get('/assets/:dir/:filename', function(req,res){
    const filename = req.params.filename
    const dir = req.params.dir
    res.status(200).sendFile(path.join(__dirname + "/assets/" + dir + "/" + filename))
    console.log('File ' + filename + ' from ' + dir + ' folder charged !')
})

app.get('/assets/css/style.css', function(req,res){
    res.status(200).sendFile(path.join(__dirname + "/assets/css/style.css"))
    console.log('File style.css charged !')
})

io.sockets.on('connection', function (socket){
    socket.emit('news',{hello: 'world'})
    socket.on('my other event', function(data){
        console.log(data)
    })
})

console.log('\nServer launched !')
server.listen(8080)
console.log('You can connect yourself locally to this address : localhost:' + app.get('port'))