const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const _ = require('lodash')

var users = require('./data/users.json')

passport.use(new LocalStrategy(function (username, password, done) {
    let user = _.find(users, { name: username })

    if (!user || user.password !== password) {
        done(null, false)
        return
    }

    done(null, user)
}))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})