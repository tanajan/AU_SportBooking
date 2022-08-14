const express = require('express')
const router = express.Router();

const { createEvent,listEvent, currentMonth, deleteEvent} = require('../controllers/fullcalendar')

router.post('/event',createEvent)

router.get('/event',listEvent)

router.post('/current-month',currentMonth)

router.delete('/event/:id',deleteEvent)

module.exports = router;
