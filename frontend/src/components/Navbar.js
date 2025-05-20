// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAppstore,
  AiOutlineTeam,
  AiOutlinePieChart,
} from "react-icons/ai";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Make sure the file in public/ is named "website-logo.png" (no spaces) */}
        <img src="/website-logo.png" alt="Restaurant Logo" />
        <span>Restaurant Management</span>
      </div>
      <div className="navbar-links">
        <Link to="/">
          <AiOutlineHome /> Home
        </Link>
        <Link to="/reservations">
          <AiOutlineCalendar /> Reservations
        </Link>
        <Link to="/orders">
          <AiOutlineShoppingCart /> Orders
        </Link>
        <Link to="/inventory">
          <AiOutlineAppstore /> Inventory
        </Link>
        <Link to="/kitchen">
          <AiOutlineAppstore /> Kitchen
        </Link>
        <Link to="/staff">
          <AiOutlineTeam /> Staff
        </Link>
        <Link to="/reports">
          <AiOutlinePieChart /> Reports
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
