# Hotel Room Booking Web Application

This is a web application designed to manage hotel room bookings. It allows users to.

List hotels and filter them by location.

Book rooms with check-in and check-out dates.

Modify booking details.

Cancel bookings.

View booked rooms.

## Technologies Used
Frontend: Express.js (serving as the frontend) and EJS for rendering templates.

Backend: Node.js with Express for RESTful APIs.

Database: JSON file (acting as a lightweight data store).

Testing: Jest with Supertest for API testing.

Validation: joi for input validation.

Docker: For containerization.

## Features
Hotel Listing: Users can view a list of hotels and filter them based on location.

Room Booking: Users can book a room, specifying the number of rooms, check-in date, check-out date, etc.

View Booked Rooms: Displays a list of rooms that the user has booked.

Modify Booking: Allows users to modify their booking details, such as check-in/check-out dates.

Cancel Booking: Users can cancel their existing bookings.

Validation: The app validates the booking details (e.g., checking room availability within the specified dates).currently only in add booking it can be added in modify booking 

The application uses joi for validating inputs on booking routes (e.g., check-in/check-out dates, room availability). It ensures that bookings are made with valid data. (currently added for only add booking , it can be added in update ) 

## Setup Instructions

Clone the Repository.

```bash
git clone https://github.com/meghamakwana/Hotel-booking-app.git
cd hotel-booking-app
git checkout development
git pull
```
## Environment Variables
  Create a .env file to store any necessary environment variables.
```bash
    PORT=3000
    NODE_ENV = development
```
##  Install Dependencies


```bash

#  Make sure you have Node.js (version 20+) and npm installed. Install the required dependencies:
  npm install


# Running the Application Locally
   npm run dev  # The app will be accessible at http://localhost:3000.

# Running Tests: To run the unit tests (using Jest):
   npm run test

# Running the Application with Docker: Build and run the Docker container:
   npm run docker-build OR docker-compose build 
   npm run docker-up OR docker-compose up # Hotel Booking App listening at http://localhost:3000
```
### API Endpoints
    Api Routes
      GET /api/hotels – Get a list of all hotels.
      POST /api/book – Create a booking.
      PUT /api/modifyBooking/:id – Update booking details.
      DELETE /api/cancelBooking/:id – Cancel a booking.
    UI Routes 
      GET / – Get hotels list
      GET /bookings – Get a list of the user's bookings.
   

## Database (Data Persistence)
  The data is stored in JSON files for simplicity:
```bash
    data/hotels.json contains hotel information.
    data/bookings.json stores user bookings.
    These files can be modified manually or programmatically.
```

