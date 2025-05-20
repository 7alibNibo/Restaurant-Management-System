import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Reservations from './routes/Reservations';
import Orders from './routes/Orders';
import Inventory from './routes/Inventory';
import Staff from './routes/Staff';
import KitchenDashboard from './components/KitchenDashboard';
import ReportsPage from './components/ReportsPage';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/kitchen" element={<KitchenDashboard/>}/>
        <Route path="/staff" element={<Staff />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
};

export default App;