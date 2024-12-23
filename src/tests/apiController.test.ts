import request from "supertest";
import app from "../app"; // Adjust path as per your app setup

describe("Booking API Tests", () => {
  // Test: Fetch all bookings
  it("GET /api/bookings - should return all bookings", async () => {
    const response = await request(app).get("/api/bookings?userId=1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test: Create a booking
  it("POST /api/book - should create a new booking", async () => {
    const newBooking = {
      hotelId: 1,
      userId: 1,
      roomsBooked: 1,
      checkInDate: "2025-02-11",
      checkOutDate: "2025-02-12",
    };

    const response = await request(app)
      .post("/api/book")
      .send(newBooking);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Room Booked Successfully");
    expect(response.body).toHaveProperty("bookingId");
  });

  // Test: Validation error on create
  it("POST /api/book - should return validation error for missing fields", async () => {
    const invalidBooking = {
      hotelId: 1,
      roomsBooked: 2,
    };
    const response = await request(app)
      .post("/api/book")
      .send(invalidBooking);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
  });

  // Test: Update a booking
  it("PUT /api/modifyBooking/:id - should update an existing booking", async () => {
    const updatedBooking = {
        roomsBooked: 3,
        checkInDate: "2024-12-28",
        checkOutDate: "2024-12-31",
    };

    const response = await request(app)
      .put("/api/modifyBooking/3")
      .send(updatedBooking);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Booking Updated Successfully");
    expect(response.body).toHaveProperty("bookingId");
  });

  // Test: Update cancel a booking
  it("CANCELL /api/cancelbooking/:id - should cancelled booking", async () => {
    const response = await request(app).put("/api/cancelbooking/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Booking Cancelled Successfully");
    expect(response.body).toHaveProperty("bookingId");
  });
});