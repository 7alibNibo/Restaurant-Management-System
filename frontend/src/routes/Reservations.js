import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Reservations.css';
import { FaUser, FaCalendarAlt, FaClock, FaUsers, FaChair, FaSearch } from 'react-icons/fa';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    date: '',
    time: '',
    numberOfGuests: '',
    tableNumber: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('/reservations')
      .then(res => setReservations(res.data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleAddReservation = async () => {
    const payload = {
      customerName: formData.customerName,
      dateTime: new Date(`${formData.date}T${formData.time}`),
      numberOfGuests: parseInt(formData.numberOfGuests),
      tableNumber: parseInt(formData.tableNumber)
    };
    try {
      if (isEditing) {
        const res = await axios.put(`/reservations/${editId}`, payload);
        setReservations(reservations.map(r => r._id === editId ? res.data : r));
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await axios.post('/reservations', payload);
        setReservations([...reservations, res.data]);
      }
      setFormData({ customerName: '', date: '', time: '', numberOfGuests: '', tableNumber: '' });
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleEdit = (id) => {
    const reservation = reservations.find(r => r._id === id);
    if (reservation) {
      const dateObj = new Date(reservation.dateTime);
      setFormData({
        customerName: reservation.customerName,
        date: dateObj.toISOString().split('T')[0],
        time: dateObj.toTimeString().slice(0, 5),
        numberOfGuests: reservation.numberOfGuests,
        tableNumber: reservation.tableNumber
      });
      setIsEditing(true);
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/reservations/${id}`);
      setReservations(reservations.filter(r => r._id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const filteredReservations = reservations.filter(r =>
    r.customerName.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="reservations-container">
      <h2>Reservations List</h2>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search by Name..." value={searchQuery} onChange={handleSearch} className="form-input" />
      </div>

      <div className="form-container">
        <div className="grid-container">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} className="form-input" />
          </div>
          <div className="input-group">
            <FaCalendarAlt className="input-icon" />
            <input name="date" type="date" value={formData.date} onChange={handleChange} className="form-input" />
          </div>
          <div className="input-group">
            <FaClock className="input-icon" />
            <input name="time" type="time" value={formData.time} onChange={handleChange} className="form-input" />
          </div>
          <div className="input-group">
            <FaUsers className="input-icon" />
            <input name="numberOfGuests" type="number" placeholder="Guests" value={formData.numberOfGuests} onChange={handleChange} className="form-input" />
          </div>
          <div className="input-group">
            <FaChair className="input-icon" />
            <input name="tableNumber" type="number" placeholder="Table" value={formData.tableNumber} onChange={handleChange} className="form-input" />
          </div>
          <button onClick={handleAddReservation} className="btn-primary">
            {isEditing ? 'Update Reservation' : 'Add Reservation'}
          </button>
        </div>
      </div>

      <div className="reservation-table">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Table</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((res) => {
              const dateObj = new Date(res.dateTime);
              const date = dateObj.toLocaleDateString();
              const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <tr key={res._id}>
                  <td>{res.customerName}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{res.numberOfGuests}</td>
                  <td>{res.tableNumber}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(res._id)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(res._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;