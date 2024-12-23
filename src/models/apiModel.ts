import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import {Hotel , Booking}  from '../utils/interface';
const bookingsFile = path.join(__dirname, '../../data/bookings.json');
const hotelsFile = path.join(__dirname, '../../data/hotels.json');

export const getHotels = () => {
  const data = readFileSync(hotelsFile, 'utf-8');
  return JSON.parse(data);
};

export const getHotelById = (id: number) => {
  const hotels : Hotel[] = getHotels();
  return hotels.find(hotel => hotel.id === id);
};

export const getBookings = () => {
  const data = readFileSync(bookingsFile, 'utf-8');
  return JSON.parse(data);
};

export const createBooking = (booking: any) => {
  const bookings = getBookings();
  const newBookingId = bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1;

  booking = { id: newBookingId, ...booking , status: 0  }
  bookings.push(booking);
  writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
  return newBookingId;
};

export const updateBooking = (bookingId: number, updatedBooking: any) => {
  const bookings = getBookings();
  const index = bookings.findIndex((b: any) => b.id === bookingId);
  if (index !== -1) {
    bookings[index] = {
      ...bookings[index], // Spread the existing properties
      roomsBooked: Number(updatedBooking.roomsBooked),
      checkInDate: updatedBooking.checkInDate,
      checkOutDate: updatedBooking.checkOutDate,
    };
    writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
  }
};

export const updateBookingStatus = (bookingId: number) => {
  const bookings = getBookings();
  const index = bookings.findIndex((b: any) => b.id === bookingId);
  if (index !== -1) {
    bookings[index] = {
      ...bookings[index], // Spread the existing properties
      status: 2, // Update the status 0 for pending , 1 for completed and 2 for cancelled
    };
    writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
  }
};
