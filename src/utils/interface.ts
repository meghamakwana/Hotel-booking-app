export  interface Hotel {
    id: number;
    name: string;
    location: string;
    roomsAvailable : number;
    pricePerNight : number;
  }
 export  interface Booking {
    id: number;
    userId: number;
    hotelId: number;
    roomsBooked: number,
    checkInDate: Date,
    checkOutDate: Date,
    status:number
  }