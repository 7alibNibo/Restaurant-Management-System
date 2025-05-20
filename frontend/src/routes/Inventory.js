import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Inventory.css';
import { FaBoxOpen, FaPencilAlt, FaTrash, FaSearch, FaCubes, FaWarehouse, FaExclamationTriangle } from 'react-icons/fa';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    itemName: '',
    quantityOnHand: '',
    reorderLevel: '',
    supplierInfo: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/inventory')
      .then(res => setInventory(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddItem = async () => {
    const payload = {
      itemName: formData.itemName,
      quantityOnHand: parseInt(formData.quantityOnHand),
      reorderLevel: parseInt(formData.reorderLevel),
      supplierInfo: formData.supplierInfo
    };
    try {
      if (isEditing) {
        const res = await axios.put(`/inventory/${editId}`, payload);
        setInventory(inventory.map(item => item._id === editId ? res.data : item));
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await axios.post('/inventory', payload);
        setInventory([...inventory, res.data]);
      }
      setFormData({ itemName: '', quantityOnHand: '', reorderLevel: '', supplierInfo: '' });
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleEdit = (id) => {
    const item = inventory.find(i => i._id === id);
    if (item) {
      setFormData({
        itemName: item.itemName,
        quantityOnHand: item.quantityOnHand,
        reorderLevel: item.reorderLevel,
        supplierInfo: item.supplierInfo || ''
      });
      setEditId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/inventory/${id}`);
      setInventory(inventory.filter(i => i._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInventory = inventory.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <h2><FaWarehouse /> Inventory List</h2>

      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search by Item Name..." value={searchTerm} onChange={handleSearch} />
      </div>

      <div className="form-container">
        <div className="form-input">
          <FaCubes />
          <input name="itemName" placeholder="Item Name" value={formData.itemName} onChange={handleChange} />
        </div>
        <div className="form-input">
          <FaBoxOpen />
          <input name="quantityOnHand" type="number" placeholder="Quantity" value={formData.quantityOnHand} onChange={handleChange} />
        </div>
        <div className="form-input">
          <FaExclamationTriangle />
          <input name="reorderLevel" type="number" placeholder="Reorder Level" value={formData.reorderLevel} onChange={handleChange} />
        </div>
        <div className="form-input">
          <input name="supplierInfo" placeholder="Supplier Info" value={formData.supplierInfo} onChange={handleChange} />
        </div>
        <button onClick={handleAddItem} className="btn-primary">
          {isEditing ? "Update Item" : "Add Item"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Reorder Level</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td className={item.quantityOnHand <= item.reorderLevel ? 'low-stock' : ''}>{item.quantityOnHand}</td>
              <td>{item.reorderLevel}</td>
              <td>{item.supplierInfo}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(item._id)}><FaPencilAlt /></button>
                <button className="btn-delete" onClick={() => handleDelete(item._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
