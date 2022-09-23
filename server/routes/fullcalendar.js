const express = require('express')
const router = express.Router();

const { createEvent,listEvent, currentMonth, deleteEvent,queryEvent,listEventwithcon, checkUserExist, createUser} = require('../controllers/fullcalendar')

router.post('/event',createEvent)

router.post('/listevent',listEventwithcon)

router.get('/event',listEvent)

router.post('/current-month',currentMonth)

router.delete('/event/:id',deleteEvent)

router.post('/dashboard',queryEvent)

router.post('/dashboard',queryEvent)

router.post('/listuser', checkUserExist)

router.post('/cuser',createUser)

module.exports = router;
