import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Orders.css';
import { FaEdit, FaTrash, FaUtensils, FaTable, FaClipboardList } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({ tableNumber: '', items: '', status: 'Pending' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrder = async () => {
    const payload = {
      tableNumber: formData.tableNumber,
      status: formData.status.toLowerCase(),
      items: formData.items.split(',').map(item => ({
        itemName: item.trim(),
        quantity: 1
      }))
    };

    try {
      if (isEditing) {
        const res = await axios.put(`/orders/${editId}`, payload);
        setOrders(orders.map(o => o._id === editId ? res.data : o));
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await axios.post('/orders', payload);
        setOrders([...orders, res.data]);
      }
      setFormData({ tableNumber: '', items: '', status: 'Pending' });
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleEdit = (id) => {
    const order = orders.find(o => o._id === id);
    if (order) {
      setFormData({
        tableNumber: order.tableNumber,
        items: order.items.map(i => i.itemName).join(', '),
        status: order.status.charAt(0).toUpperCase() + order.status.slice(1)
      });
      setEditId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/orders/${id}`);
      setOrders(orders.filter(o => o._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title"><FaClipboardList /> Orders List</h2>
      <div className="form-container">
        <div className="form-input"><FaTable className="icon" />
          <input name="tableNumber" placeholder="Table Number" value={formData.tableNumber} onChange={handleChange} />
        </div>
        <div className="form-input"><FaUtensils className="icon" />
          <input name="items" placeholder="Items (comma-separated)" value={formData.items} onChange={handleChange} />
        </div>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Pending</option><option>Preparing</option><option>Served</option>
        </select>
        <button className="btn-primary" onClick={handleAddOrder}>
          {isEditing ? "Update Order" : "Add Order"}
        </button>
      </div>
      <table>
        <thead>
          <tr><th>Order ID</th><th>Table</th><th>Items</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>#{order._id.slice(-4)}</td>
              <td>{order.tableNumber}</td>
              <td>{order.items.map(i => `${i.itemName} x${i.quantity}`).join(', ')}</td>
              <td>{order.status}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(order._id)}><FaEdit /></button>
                <button className="btn-delete" onClick={() => handleDelete(order._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
