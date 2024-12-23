import { getHotels, getBookings, getHotelById ,createBooking , updateBooking , updateBookingStatus} from '../models/apiModel';
import  { Request, Response } from 'express';
import {Hotel , Booking}  from '../utils/interface';
export const getHotelList = (req: Request, res: Response): void => {
  const { location } = req.query; // Extract query parameter 'location'
  const hotels : Hotel[] = getHotels();
  if (location) {
    
    const keywords = (location as string)?.split(',') || [];
    const filteredHotels = hotels.filter(hotel => {
      const regex = new RegExp(keywords.join('|'), 'i');  // Create a regular expression to match any of the keywords in the hotel location
      return  regex.test(hotel.location.toLowerCase());
    });
    if (filteredHotels.length > 0) {
       res.status(200).json(filteredHotels); // Return filtered hotels
    } else {
       res.status(404).json({ message: 'No hotels found for this location' });
    }
  } else {
     res.status(200).json(hotels);
  }
};
export const getMyBookings = (req: Request, res: Response): void => {
  const userId = req.query.userId as string;
  const bookings : Booking[] = getBookings();
  const hotels : Hotel[] = getHotels();
  if (userId) {  
    // Filter hotels by location if provided
    const filteredBooking = bookings.filter((booking) =>
      booking.userId === parseInt(userId)
    );
    const bookingsWithHotelDetails = filteredBooking.map((booking) => {
      // Find the hotel by matching the hotelId
      const hotel = hotels.find((hotel) => hotel.id === booking.hotelId);
      if (hotel) {
        // Combine hotel details into the booking
        return {
          ...booking,
          hotelName: hotel.name,
          hotelLocation: hotel.location,
        };
      }
  
      // If hotel is not found, return the booking without hotel details
      return booking;
    });
    if (bookingsWithHotelDetails.length > 0) {
       res.status(200).json(bookingsWithHotelDetails); 
    } else {
       res.status(404).json({ message: 'No Booking found ' });
    }
  } else {
    // If no location is provided, return all hotels
     res.status(400).json({message:"User Id required"});
  }
};

export const bookHotelRoom = (req: Request, res: Response): void => {
  try {
    const {hotelId} = req.body;
    const bookingData = req.body;
    const hotel = getHotelById(hotelId);
    if (!hotel) {
       res.status(404).json({message:'Hotel not found'});
    } else {
      const bookingId = createBooking(bookingData);
      res.status(201).json({message:'Room Booked Successfully',bookingId:bookingId});
    }
  } catch (error:any) {
    res.status(400).json({message:error.message});
  } 
}
export const modifyBooking = (req: Request, res: Response) => {
  try {
    updateBooking(Number(req.params.id), req.body);
    res.status(200).json({message:'Booking Updated Successfully',bookingId :Number(req.params.id)});
  } catch (error : any) {
    res.status(400).json({message:error.message});
  }
}
export const cancelBooking = (req: Request, res: Response) => {
  try {
    updateBookingStatus(Number(req.params.id));
    res.status(200).json({message:'Booking Cancelled Successfully', bookingId :Number(req.params.id)});
  } catch (error : any) {
    res.status(400).json({message:error.message});
  }
}
