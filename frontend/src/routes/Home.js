// src/routes/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUtensils,
  FaBoxes,
  FaUserTie,
  FaConciergeBell,
} from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      
      {/* Header Section */}
      <div className="home-header">
        Welcome to <span className="highlighted-text">Restaurant Management System</span>
      </div>
      
      <p className="home-description">
        Manage your reservations, orders, inventory, kitchen, and staff schedules with ease.
      </p>

      {/* Dashboard Cards */}
      <div className="dashboard">
        <Link to="/reservations" className="dashboard-card">
          <FaCalendarAlt className="dashboard-icon" />
          <h3>Reservations</h3>
        </Link>

        <Link to="/orders" className="dashboard-card">
          <FaUtensils className="dashboard-icon" />
          <h3>Orders</h3>
        </Link>

        <Link to="/inventory" className="dashboard-card">
          <FaBoxes className="dashboard-icon" />
          <h3>Inventory</h3>
        </Link>

        <Link to="/kitchen" className="dashboard-card">
          <FaConciergeBell className="dashboard-icon" />
          <h3>Kitchen</h3>
        </Link>

        <Link to="/staff" className="dashboard-card">
          <FaUserTie className="dashboard-icon" />
          <h3>Staff</h3>
        </Link>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2025 Restaurant Management System
      </footer>
    </div>
  );
};

export default Home;