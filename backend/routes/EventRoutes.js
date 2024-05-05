import express from 'express'
import { createEvent, deleteEvent, getAllEvents, getOneEvent, payForEvent, updateEvent, updateStatus } from '../controllers/EventController.js'
import { upload } from '../utils/functions.js';
import { createBooking } from '../controllers/BookingController.js';

const eventRouter = express.Router()

eventRouter.get('/', getAllEvents);
eventRouter.get('/:id', getOneEvent);
eventRouter.put('/:id', updateEvent);
eventRouter.put('/pay/:id', payForEvent);
eventRouter.put('/status/:id', updateStatus);
eventRouter.post('/', upload.single('image'), createEvent);
eventRouter.post('/book', createBooking)
eventRouter.delete('/:id', deleteEvent);

export default eventRouter;