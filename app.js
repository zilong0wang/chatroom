const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.render('index', { title: 'Chatroom Home' })
})

var adminRouter = require('./admin')
app.use('/admin', adminRouter)

app.listen(3000, function () {
    console.log('Chatroom app is listening on port 3000.')
})