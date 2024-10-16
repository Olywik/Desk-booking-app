const desks = Array(9).fill(null); // Initialize 9 desks as available
const deskContainer = document.getElementById('desk-container');
const deskSelect = document.getElementById('desk-select');
const bookingForm = document.getElementById('booking-form');
const bookingList = document.getElementById('booking-list');
const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

function renderDesks() {
    deskContainer.innerHTML = '';
    desks.forEach((desk, index) => {
        const deskDiv = document.createElement('div');
        deskDiv.className = 'desk ' + (desk ? 'booked' : 'available');
        deskDiv.textContent = `Desk ${index + 1}`;
        deskDiv.addEventListener('click', () => toggleDesk(index));
        deskContainer.appendChild(deskDiv);
    });
    updateDeskSelect();
    updateBookingList();
}

function updateDeskSelect() {
    deskSelect.innerHTML = '';
    desks.forEach((desk, index) => {
        if (!desk) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Desk ${index + 1}`;
            deskSelect.appendChild(option);
        }
    });
}

function toggleDesk(index) {
    if (!desks[index]) {
        const name = prompt('Enter your name to book this desk:');
        const date = prompt('Enter the booking date (YYYY-MM-DD):');
        if (name && date) {
            desks[index] = { name, date };
            renderDesks();
        }
    } else {
        const { name, date } = desks[index];
        if (confirm(`Cancel booking for ${name} on Desk ${index + 1} for ${date}?`)) {
            desks[index] = null;
            renderDesks();
        }
    }
}

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const deskIndex = deskSelect.value;
    const name = document.getElementById('name').value;
    const date = document.getElementById('booking-date').value;

    if (desks[deskIndex] === null) {
        desks[deskIndex] = { name, date };
        renderDesks();
    } else {
        alert('Desk is already booked!');
    }
    bookingForm.reset();
});

// Function to update the booking list display
function updateBookingList() {
    bookingList.innerHTML = '';
    desks.forEach((desk, index) => {
        if (desk) {
            const listItem = document.createElement('li');
            listItem.textContent = `Desk ${index + 1}: ${desk.name} on ${desk.date}`;
            bookingList.appendChild(listItem);
        }
    });
}

// Function to clear bookings automatically every day
function clearBookings() {
    const todayDate = new Date().toISOString().split('T')[0];
    desks.forEach((desk, index) => {
        if (desk && desk.date < todayDate) {
            desks[index] = null; // Clear the booking
        }
    });
    renderDesks();
}

// Automatically clear bookings at midnight (for demonstration, we call it manually here)
clearBookings();
