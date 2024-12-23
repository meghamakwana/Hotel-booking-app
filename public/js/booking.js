 // Fetch hotels and display them on the homepage
 window.onload = function() {
    fetchBookings();
  };
 // Fetch bookings and display them on the Booked Rooms page
 function fetchBookings() {
    const userId = parseInt(document.getElementById('userId').value);
    fetch(`api/bookings?userId=`+userId)
      .then(response => response.json())
      .then(data => {
        const bookingsTable = document.getElementById('bookings-table').getElementsByTagName('tbody')[0];
        bookingsTable.innerHTML = ''; // Clear any existing content
  
        data.forEach(booking => {
            const action = booking.status==2 ? 'Cancelled': `<button class="btn btn-primary" data-id="${booking.id}"  onclick="openUpdateBookingModal(this)">Modify</button>
                <button class="btn btn-danger" data-id="${booking.id}" onclick="handleCancelBooking(this)">Cancel</button>`;
          const row = `
            <tr id="id-${booking.id}">
                <td>${booking.hotelName}, ${booking.hotelLocation}</td>
                <td>${booking.roomsBooked}</td>
                <td>${booking.checkInDate}</td>
                <td>${booking.checkOutDate}</td>
                <td>${action}</td>
            </tr>
          `;
          bookingsTable.innerHTML += row;
        });
      })
      .catch(error => console.error('Error fetching bookings:', error));
  }
  // Open the update booking modal and populate the form
 function openUpdateBookingModal(clickedElement) {
    const closestTr = clickedElement.closest('tr');
    const bookingId = clickedElement.getAttribute('data-id');
    const roomCount= closestTr.children[1].textContent.trim();
    const checkinDate= closestTr.children[2].textContent.trim();
    const checkoutDate= closestTr.children[3].textContent.trim();
    document.getElementById('update-room-count').value =roomCount;
    document.getElementById('update-checkin-date').value = checkinDate;
    document.getElementById('update-checkout-date').value = checkoutDate;
    document.getElementById('update-booking-id').value = bookingId;
  
    const updateModal = new bootstrap.Modal(document.getElementById('updateBookingModal'));
    updateModal.show();
  
    // Store bookingId globally for later use
    window.currentBookingId = bookingId;
  }

  // Handle updating booking
  const updateBookingForm = document.getElementById('updateBookingForm');
  updateBookingForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission (page reload)

    // Collect form data
    const roomsBooked = document.getElementById('update-room-count').value;
    const checkInDate = document.getElementById('update-checkin-date').value;
    const checkOutDate = document.getElementById('update-checkout-date').value;
    const bookingId = document.getElementById('update-booking-id').value;
    // Create an object with the form data
    const formData = {
      roomsBooked,
      checkInDate,
      checkOutDate,
    };

    // Make the AJAX request to submit the booking
    fetch('/api/modifyBooking/'+bookingId, {
      method: 'PUT',
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
          const currentRow = document.getElementById('id-${data.bookingId}');
          console.log(currentRow);
          alert(`Booking Updated Successful! Booking ID: ${data.bookingId}`);
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
    $('#updateBookingModal').modal('hide');
  });
  
  // Handle canceling booking
  async function handleCancelBooking(clickedElement) {
    const bookingId = clickedElement.getAttribute('data-id');
    const confirmation = confirm("Are you sure you want to cancel this booking?");

  if (!confirmation) {
    return; // If the user clicks "Cancel" in the confirmation dialog, do nothing
  }

    const response = await fetch(`/api/cancelBooking/${bookingId}`, {
      method: 'PUT',
    });
  
    const data = await response.json();
  
    if (data.bookingId) {
      clickedElement.closest('tr').children[4].innerHTML="Cancelled";
    } else {
      alert('Failed to cancel booking');
    }
  }