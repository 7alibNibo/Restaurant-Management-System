import React, { useState } from 'react';
import '../styles/Staff.css';
import API from '../api/axios'; // Import the Axios instance


const StaffSchedule = () => {
  const [form, setForm] = useState({
    name: '',
    position: '',
    shiftStart: '',
    shiftEnd: ''
  });
  const [staffList, setStaffList] = useState([]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStaffList([
      ...staffList,
      { id: staffList.length + 1, ...form }
    ]);
    setForm({ name: '', position: '', shiftStart: '', shiftEnd: '' });
  };

  return (
    <div className="form-container">
      <h3>Manage Staff Schedule</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Staff Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
        />
        <input
          name="shiftStart"
          type="time"
          value={form.shiftStart}
          onChange={handleChange}
          required
        />
        <input
          name="shiftEnd"
          type="time"
          value={form.shiftEnd}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Schedule</button>
      </form>

      {staffList.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Shift Start</th>
              <th>Shift End</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.position}</td>
                <td>{s.shiftStart}</td>
                <td>{s.shiftEnd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffSchedule;