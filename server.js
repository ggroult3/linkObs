const express = require('express')
const app = express()
const path = require('path')

app.use('/',express.static(path.join(__dirname,'/assets')))

app.get('/',function(req,res){
    app.use('/',express.static(path.join(__dirname,'/assets')))
    res.status(200).sendFile(path.join(__dirname,'/assets/html/index.html'))
    console.log('\nConnected to the webapp !\n')
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


console.log('\nServer launched !')
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'))
console.log('You can connect yourself locally to this address : localhost:' + app.get('port'))