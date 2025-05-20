import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Staff.css';
import { FaUserTie, FaBriefcase, FaClock, FaSearch } from 'react-icons/fa';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [formData, setFormData] = useState({
    staffName: '',
    position: '',
    shiftStart: '',
    shiftEnd: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/staff-schedules')
      .then(res => setStaffList(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddStaff = async () => {
    const payload = {
      staffName: formData.staffName,
      position: formData.position,
      shiftStart: new Date(formData.shiftStart),
      shiftEnd: new Date(formData.shiftEnd)
    };
    try {
      if (isEditing) {
        const res = await axios.put(`/staff-schedules/${editId}`, payload);
        setStaffList(staffList.map(s => s._id === editId ? res.data : s));
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await axios.post('/staff-schedules', payload);
        setStaffList([...staffList, res.data]);
      }
      setFormData({ staffName: '', position: '', shiftStart: '', shiftEnd: '' });
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleEdit = (id) => {
    const staff = staffList.find(s => s._id === id);
    if (staff) {
      setFormData({
        staffName: staff.staffName,
        position: staff.position,
        shiftStart: new Date(staff.shiftStart).toISOString().slice(0, 16),
        shiftEnd: new Date(staff.shiftEnd).toISOString().slice(0, 16)
      });
      setEditId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/staff-schedules/${id}`);
      setStaffList(staffList.filter(s => s._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaff = staffList.filter(
    s => s.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="staff-container">
      <h2><FaUserTie /> Staff Management</h2>

      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      </div>

      <div className="form-container">
        <div className="form-input">
          <FaUserTie />
          <input name="staffName" placeholder="Staff Name" value={formData.staffName} onChange={handleChange} />
        </div>
        <div className="form-input">
          <FaBriefcase />
          <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
        </div>
        <div className="form-input">
          <FaClock />
          <input name="shiftStart" type="datetime-local" value={formData.shiftStart} onChange={handleChange} />
        </div>
        <div className="form-input">
          <FaClock />
          <input name="shiftEnd" type="datetime-local" value={formData.shiftEnd} onChange={handleChange} />
        </div>
        <button onClick={handleAddStaff}>{isEditing ? "Update Staff" : "Add Staff"}</button>
      </div>

      <table>
        <thead>
          <tr><th>Name</th><th>Position</th><th>Shift Start</th><th>Shift End</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filteredStaff.map(s => (
            <tr key={s._id}>
              <td>{s.staffName}</td>
              <td>{s.position}</td>
              <td>{formatDateTime(s.shiftStart)}</td>
              <td>{formatDateTime(s.shiftEnd)}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(s._id)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Staff;
