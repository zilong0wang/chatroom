const express = require('express')
const _ = require('lodash')
const uuid = require('node-uuid')

var rooms = require('./data/rooms.json')

const router = express.Router()
module.exports = router

router.get('/rooms', function (req, res) {
    res.render('rooms', { title: 'Admin - Chatrooms', rooms: rooms })
})

router.route('/rooms/add')
    .post(function (req, res) {
        let room = {
            name: req.body.name,
            id: uuid.v4()
        }
        rooms.push(room)
        res.redirect(`${req.baseUrl}/rooms`)
    }).get(function (req, res) {
        res.render('add', { title: 'Admin - Add Chatroom' })
    })

router.route('/rooms/edit/:id')
    .all(function (req, res, next) {
        let room = _.find(rooms, { id: req.params.id })
        if (!room) {
            res.sendStatus(404)
            return
        }
        res.locals.room = room
        next()
    })
    .get(function (req, res) {
        res.render('edit', { title: 'Admin - Edit Chatroom', room: res.locals.room })
    })
    .post(function (req, res) {
        res.locals.room.name = req.body.name
        res.redirect(`${req.baseUrl}/rooms`)
    })

router.get('/rooms/delete/:id', function (req, res) {
    rooms = rooms.filter(r => r.id !== req.params.id)
    res.redirect(`${req.baseUrl}/rooms`)
})