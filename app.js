const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
const app = express()
const passport = require('passport')
require('./passport-init')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(require('./logging'))

app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))
app.use(express.static('./node_modules/jquery/dist'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


var authRouter = require('./auth')
app.use(authRouter)

app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
        return
    }
    res.redirect('/login')
})

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