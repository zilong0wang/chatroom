const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(require('./logging'))

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