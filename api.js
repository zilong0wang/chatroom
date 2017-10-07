const express = require('express')
const _ = require('lodash')
const uuid = require('node-uuid')

var rooms = require('./data/rooms.json')
var messages = require('./data/messages.json')

var router = express.Router()
module.exports = router

router.get('/rooms', function (req, res) {
    res.json(rooms)
})

router.route('/rooms/:id/messages')
    .get(function (req, res) {
        let roomId = req.params.id,
            room = _.find(rooms, { id: roomId }),
            roomMessages = _.filter(messages, { roomId: roomId })
        res.json({
            room: room,
            messages: roomMessages
        })
    })
    .post(function (req, res) {
        console.log(req)
        let roomId = req.params.id,
            message = {
                roomId: roomId,
                text: req.body.text,
                userId: '44f885e8-87e9-4911-973c-4074188f408a',
                id: uuid.v4()
            }
        messages.push(message)
        res.send(200)
    })
    .delete(function (req, res) {
        let roomId = req.params.id
        messages = _.filter(messages, r => r.roomId !== roomId)
        res.send(200)
    })