import React, { useState } from 'react';
import '../styles/Home.css';
import '../styles/Inventory.css';
import API from '../api/axios'; // Import the Axios instance

const InventoryDashboard = () => {
  const [form, setForm] = useState({
    itemName: '',
    quantity: '',
    reorderLevel: ''
  });
  const [inventory, setInventory] = useState([]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setInventory([
      ...inventory,
      { id: inventory.length + 1, ...form }
    ]);
    setForm({ itemName: '', quantity: '', reorderLevel: '' });
  };

  return (
    <div className="form-container">
      <h3>Manage Inventory</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="itemName"
          placeholder="Item Name"
          value={form.itemName}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          min="0"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="reorderLevel"
          type="number"
          min="0"
          placeholder="Reorder Level"
          value={form.reorderLevel}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Inventory</button>
      </form>

      {inventory.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Reorder Lvl</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.itemName}</td>
                <td>{i.quantity}</td>
                <td>{i.reorderLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryDashboard;