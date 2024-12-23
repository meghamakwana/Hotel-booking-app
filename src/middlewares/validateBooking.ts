
import { Request, Response, NextFunction } from 'express';
import { bookingValidator, updateBookingValidator } from '../utils/validators';
import {Booking ,Hotel}  from '../utils/interface';
import {getBookings,getHotelById} from '../models/apiModel';
export const validateBooking = (req: Request, res: Response, next: NextFunction) :any => {
  const { error } = (!req.params.id) ? bookingValidator.validate(req.body) : updateBookingValidator.validate(req.body) ;
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details.map(detail => detail.message).join(', '),
    });
  }
  next();
};

export const validateBookingOverlape = (req: Request, res: Response, next: NextFunction) :any => {
  const {checkInDate, checkOutDate, roomsBooked, hotelId} = req.body;
  const newCheckInDate = new Date(checkInDate);
  const newCheckOutDate = new Date(checkOutDate);
  const bookings : Booking[] = getBookings();
  const hotelDetail : any = getHotelById(hotelId);
  // Filter bookings for the same hotel and overlapping dates
  const overlappingBookings = bookings.filter((booking) => {
    if ((booking.hotelId !== hotelId) && booking.status !== 2) return false;

    const existingCheckIn = new Date(booking.checkInDate);
    const existingCheckOut = new Date(booking.checkOutDate);

    // Check for overlapping date ranges
    return (
      (newCheckInDate >= existingCheckIn && newCheckInDate < existingCheckOut) || 
      (newCheckOutDate > existingCheckIn && newCheckOutDate <= existingCheckOut) || 
      (newCheckInDate <= existingCheckIn && newCheckOutDate >= existingCheckOut) 
    );
  });

  // Calculate total booked rooms in overlapping bookings
  const totalBookedRooms = overlappingBookings.reduce((sum, booking) => sum + booking.roomsBooked, 0);
  if (totalBookedRooms + roomsBooked > hotelDetail.roomsAvailable) {
    return res.status(400).json({
      status: 'error',
      message: `Booking cannot be completed. Only ${ hotelDetail.roomsAvailable - totalBookedRooms} rooms are available.`,
    });
  }

 next();
}


