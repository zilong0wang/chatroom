const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

var fs = require('fs')
var path = require('path')
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(require('morgan')('combined', { stream: accessLogStream }))

app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))
app.use(express.static('./node_modules/jquery/dist'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('home', { title: 'Chatroom Home' })
})

var adminRouter = require('./admin')
app.use('/admin', adminRouter)

var apiRouter = require('./api')
app.use('/api', apiRouter)

app.listen(3000, function () {
    console.log('Chatroom app is listening on port 3000.')
})