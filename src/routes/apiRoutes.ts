import express from 'express';
import {getHotelList ,bookHotelRoom ,modifyBooking, cancelBooking ,getMyBookings } from '../controllers/apiController';
import  {validateBooking, validateBookingOverlape}  from '../middlewares/validateBooking';

export const apiRoutes = express.Router();

apiRoutes.get('/hotels', getHotelList);
apiRoutes.post('/book', validateBooking, validateBookingOverlape, bookHotelRoom);
apiRoutes.put('/modifyBooking/:id', validateBooking, modifyBooking);
apiRoutes.put('/cancelBooking/:id', cancelBooking);
apiRoutes.get('/bookings', getMyBookings);