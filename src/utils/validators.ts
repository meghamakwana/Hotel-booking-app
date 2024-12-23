import Joi from 'joi';

export const bookingValidator = Joi.object({
  hotelId: Joi.number().required(),
  userId: Joi.number().required(),
  roomsBooked: Joi.number().min(1).required(),
  checkInDate: Joi.date().greater('now').required(),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required()
});
export const updateBookingValidator = Joi.object({
  roomsBooked: Joi.number().min(1).required(),
  checkInDate: Joi.date().greater('now').required(),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required()
});
