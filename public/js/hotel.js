// Fetch hotels and display them on the homepage
window.onload = function() {
    fetchHotels();
    $('#location').on('input', function() {
      const location = $(this).val();
      fetchHotels(location); // Fetch filtered hotels based on location
    });
  };
  function openBookingModel(clickedElement) {
    const hotelId = clickedElement.getAttribute('data-id');
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    bookingModal.show();
    document.getElementById('hotelId').value = hotelId;

  }

  // Fetch  hotels from the API and render them
  function fetchHotels(location = '') {
    fetch(`/api/hotels?location=${location}`)
      .then(response => response.json())
      .then(data => {
        const hotelList = document.getElementById('hotel-list');
        hotelList.innerHTML = ''; // Clear any existing content
        if(data.length>0){
          data.forEach(hotel => {
            const image = hotel.image ? `/images/${hotel.image}` : '/images/placeholder.png';
            const hotelCard = `
              <div class="col-md-4">
                <div class="card mb-4">
                  <img src="${image}" class="card-img-top" alt="${hotel.name}">
                  <div class="card-body">
                    <h5 class="card-title">${hotel.name}</h5>
                    <p class="card-text">Location: ${hotel.location}</p>
                    <p class="card-text">Price per night: ₹ ${hotel.pricePerNight}</p>
                    <p class="card-text">Available Rooms: ${hotel.roomsAvailable}</p>
                    <button class="btn btn-primary" data-id="${hotel.id}" onclick="openBookingModel(this)">Book Now</button>
                  </div>
                </div>
              </div>
              `;
              hotelList.innerHTML += hotelCard;
            });
        } else {
          const html = `
              <div class="col-md-12">
                <h5>${data.message}</h5>
              </div>
              `;
              hotelList.innerHTML = html;
        }
      })
      .catch(error => console.error('Error fetching hotels:', error));
  }
  
  document.addEventListener('DOMContentLoaded', function () {
  // Handle form submission for the booking form
  const bookingForm = document.getElementById('bookingForm');

  bookingForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission (page reload)

    // Collect form data
    const hotelId = parseInt(document.getElementById('hotelId').value);
    const roomsBooked = parseInt(document.getElementById('rooms').value);
    const checkInDate = document.getElementById('checkIn').value;
    const checkOutDate = document.getElementById('checkOut').value;
    const userId = parseInt(document.getElementById('userId').value);

    // Create an object with the form data
    const formData = {
      hotelId,
      userId,
      roomsBooked,
      checkInDate,
      checkOutDate,
      
    };

    // Make the AJAX request to submit the booking
    fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.bookingId) {
          // Booking was successful, show a success message
          alert(`Booking Successful! Booking ID: ${data.bookingId}`);
          window.location.href = '/bookings'; // Redirect to bookings page
        } else {
          // Show an error message if booking failed
          alert(`Booking failed:  ${data.message}` );
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });

    // Close the modal after submission (optional)
    $('#bookingModal').modal('hide');
  });
});



  