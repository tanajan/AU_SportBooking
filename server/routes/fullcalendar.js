const express = require('express')
const router = express.Router();

const { createEvent,listEvent, currentMonth, deleteEvent,queryEvent,listEventwithcon} = require('../controllers/fullcalendar')

router.post('/event',createEvent)

router.post('/listevent',listEventwithcon)

router.get('/event',listEvent)

router.post('/current-month',currentMonth)

router.delete('/event/:id',deleteEvent)

router.post('/dashboard',queryEvent)

module.exports = router;
