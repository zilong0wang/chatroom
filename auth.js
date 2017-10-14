const express = require('express')
const passport = require('passport')

var router = express.Router()
module.exports = router

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login')
})