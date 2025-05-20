import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Kitchen.css';
import { FaUtensils, FaClock, FaCheckCircle, FaSearch } from 'react-icons/fa';

const Kitchen = () => {
  const [kitchenOrders, setKitchenOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/orders')
      .then(res => {
        const filtered = res.data.filter(order =>
          order.status.toLowerCase() === 'preparing' || order.status.toLowerCase() === 'ready'
        );
        setKitchenOrders(filtered);
      })
      .catch(err => console.error('Error fetching kitchen orders:', err));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = kitchenOrders.filter(order =>
    order.items.map(i => i.itemName).join(', ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="kitchen-container">
      <h2><FaUtensils /> Kitchen Orders</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search by Item Name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Table</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.tableNumber}</td>
              <td>{order.items.map(i => `${i.itemName} x${i.quantity}`).join(', ')}</td>
              <td className={order.status === 'Ready' ? 'ready' : ''}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Kitchen;
