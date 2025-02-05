const seats = document.querySelectorAll('.container .seat:not(.sold)');
const countElement = document.getElementById('count');
const totalElement = document.getElementById('total');
const confirmButton = document.getElementById('confirmButton');
const movieSelect = document.getElementById('movie');

let selectedSeats = [];

// Retrieve stored reserved seats from localStorage
function getStoredSeats() {
    return JSON.parse(localStorage.getItem('reservedSeats')) || {};
}

// Load reserved seats from localStorage
function loadReservedSeats() {
    const storedSeats = getStoredSeats();
    const movie = movieSelect.value;
    const reservedSeats = storedSeats[movie] || [];

    seats.forEach((seat, index) => {
        if (reservedSeats.includes(index)) {
            seat.classList.add('sold');
        }
    });

    updateSelectedCount();
}

// Update selected seat count and total price
function updateSelectedCount() {
    selectedSeats = Array.from(seats).filter(seat => seat.classList.contains('selected'));
    countElement.textContent = selectedSeats.length;
    totalElement.textContent = selectedSeats.length * parseInt(movieSelect.value);
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

// Event listener for movie selection change
movieSelect.addEventListener('change', () => {
    seats.forEach(seat => seat.classList.remove('sold')); // Reset seat states
    loadReservedSeats(); // Load reserved seats for the selected movie
});

// Event listener for confirming the reservation
confirmButton.addEventListener('click', () => {
    const availableSeats = Array.from(seats).filter(seat => !seat.classList.contains('sold'));

    if (availableSeats.length < 10) {
        alert("Reservation cannot be completed! Less than 10 seats are available.");
        return;
    }

    if (selectedSeats.length === 0) {
        alert("Please select a seat before confirming.");
        return;
    }

    const movie = movieSelect.value;
    let confirmedSeats = [];

    selectedSeats.forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('sold');
        confirmedSeats.push([...seats].indexOf(seat)); // Store seat index
    });

    // Save the selected seats for this movie in localStorage
    const storedSeats = getStoredSeats();
    storedSeats[movie] = storedSeats[movie] ? [...storedSeats[movie], ...confirmedSeats] : confirmedSeats;
    localStorage.setItem('reservedSeats', JSON.stringify(storedSeats));

    alert(`Reservation successful! You have reserved ${selectedSeats.length} seat(s) for PHP ${selectedSeats.length * parseInt(movie)}.`);
    updateSelectedCount();
});

// Load initial reserved seats
loadReservedSeats();

