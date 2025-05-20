import React, { useState } from 'react';
import '../styles/Orders.css';
import API from '../api/axios'; // Import the Axios instance

const OrderManagement = () => {
  const [form, setForm] = useState({
    tableNumber: '',
    items: '',
    status: 'Pending'
  });
  const [orders, setOrders] = useState([]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setOrders([
      ...orders,
      { id: orders.length + 1, ...form }
    ]);
    setForm({
      tableNumber: '',
      items: '',
      status: 'Pending'
    });
  };

  return (
    <div className="form-container">
      <h3>Place an Order</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="tableNumber"
          placeholder="Table Number"
          type="number"
          min="1"
          value={form.tableNumber}
          onChange={handleChange}
          required
        />
        <input
          name="items"
          placeholder="Items (comma-separated)"
          value={form.items}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Preparing</option>
          <option>Served</option>
        </select>
        <button type="submit">Add Order</button>
      </form>

      {orders.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Table #</th>
              <th>Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.tableNumber}</td>
                <td>{o.items}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderManagement;