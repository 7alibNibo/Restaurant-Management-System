import React, { useState } from 'react';
import '../styles/Reservations.css';

const ReservationForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [table, setTable] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!customerName) errors.customerName = "Customer Name is required";
    if (!date) errors.date = "Date is required";
    if (!time) errors.time = "Time is required";
    if (!guests || isNaN(guests) || guests <= 0) errors.guests = "Enter a valid number of guests";
    if (!table || isNaN(table)) errors.table = "Enter a valid table number";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid! Proceed to send data to backend.');
      // Call your API to save the reservation
    }
  };

  return (
    <div className="reservation-form">
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        {errors.customerName && <span className="error">{errors.customerName}</span>}

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <span className="error">{errors.date}</span>}

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        {errors.time && <span className="error">{errors.time}</span>}

        <input
          type="number"
          placeholder="Number of Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        {errors.guests && <span className="error">{errors.guests}</span>}

        <input
          type="number"
          placeholder="Table Number"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
        {errors.table && <span className="error">{errors.table}</span>}

        <button type="submit" className="btn-primary">Add Reservation</button>
      </form>
    </div>
  );
};

export default ReservationForm;