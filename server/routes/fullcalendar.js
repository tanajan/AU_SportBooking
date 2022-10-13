const express = require('express')
const router = express.Router();

const { createEvent,listEvent,chartEvent, currentday,currentMonth,getuserAbacID, deleteEvent,queryEvent,listEventwithcon, checkUserExist, createUser} = require('../controllers/fullcalendar')

router.post('/event',createEvent)

router.post('/listevent',listEventwithcon)

router.get('/event',listEvent)

router.post('/current-month',currentMonth)

router.get('/current-day',currentday)

router.delete('/event/:id',deleteEvent)

router.post('/dashboard',queryEvent)

router.post('/chart',chartEvent)

router.post('/listuser', checkUserExist)

router.post('/getuser', getuserAbacID)

router.post('/cuser',createUser)

module.exports = router;
