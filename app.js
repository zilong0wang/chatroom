const express = require('express')
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))

app.get('/', function (req, res) {
    res.render('index', { title: 'Chatroom Home' })
})

app.listen(3000, function () {
    console.log('Chatroom app is listening on port 3000.')
})