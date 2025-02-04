const seats = document.querySelectorAll('.container .seat:not(.sold)'); // Only include available seats
const countElement = document.getElementById('count');
const totalElement = document.getElementById('total');
const confirmButton = document.getElementById('confirmButton');

let selectedSeats = [];

// Function to update selected seats and display count and total
function updateSelectedCount() {
    selectedSeats = Array.from(seats).filter(seat => seat.classList.contains('selected'));
    countElement.textContent = selectedSeats.length;
    totalElement.textContent = selectedSeats.length * 390; // Assuming each seat costs 100 RS
}

// Event listener for seat selection
seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('sold')) {
            seat.classList.toggle('selected');
            updateSelectedCount();
        }   
    });
});

// Event listener for confirmation
confirmButton.addEventListener('click', () => {
    if (selectedSeats.length === 0) {
        alert("Please select a seat."); // Alert if no seats are selected
    } else {
        selectedSeats.forEach(seat => {
            seat.classList.remove('selected');
            seat.classList.add('sold');
        });
    alert(`Confirmation successful! You have selected ${selectedSeats.length} seat(s) for a total price of PHP ${selectedSeats.length * 390}.`);
    updateSelectedCount(); // Update the count and total after confirming
    }
});