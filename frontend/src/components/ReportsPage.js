import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Reports.css';
import {
  FaUsers,
  FaClipboardList,
  FaWarehouse,
  FaUserTie,
  FaSearch,
  FaFilePdf,
  FaFileExcel,
  FaPrint,
  FaUtensils,
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    axios.get('/reservations').then(res => setReservations(res.data)).catch(err => console.error('Reservations error:', err));
    axios.get('/orders').then(res => setOrders(res.data)).catch(err => console.error('Orders error:', err));
    axios.get('/inventory').then(res => setInventory(res.data)).catch(err => console.error('Inventory error:', err));
    axios.get('/staff-schedules').then(res => setStaff(res.data)).catch(err => console.error('Staff error:', err));
  }, []);

  const handleExportPDF = () => {
    const input = document.getElementById('report-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('ReportsOverview.pdf');
    });
  };

  const handleExportExcel = () => {
    const tables = Array.from(document.querySelectorAll('table'));
    const workbook = XLSX.utils.book_new();
    tables.forEach((table, index) => {
      const sheet = XLSX.utils.table_to_sheet(table);
      XLSX.utils.book_append_sheet(workbook, sheet, `Report ${index + 1}`);
    });
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'ReportsOverview.xlsx');
  };

  const handlePrint = () => window.print();
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredReservations = reservations.filter(r =>
    r.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.items?.map(i => i.itemName).join(', ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInventory = inventory.filter(i =>
    i.itemName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const kitchen = orders.filter(o => o.status === 'preparing' || o.status === 'ready');
  const filteredKitchen = kitchen.filter(o =>
    o.items?.map(i => i.itemName).join(', ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staff.filter(s =>
    s.staffName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="reports-container" id="report-content">
      <h2>📊 Reports Overview</h2>

      <div className="summary-cards">
        <div className="card"><FaUsers /><h3>Reservations</h3><p>{reservations.length}</p></div>
        <div className="card"><FaClipboardList /><h3>Orders</h3><p>{orders.length}</p></div>
        <div className="card"><FaWarehouse /><h3>Inventory Items</h3><p>{inventory.length}</p></div>
        <div className="card"><FaUtensils /><h3>Kitchen Orders</h3><p>{kitchen.length}</p></div>
        <div className="card"><FaUserTie /><h3>Staff Members</h3><p>{staff.length}</p></div>
      </div>

      <div className="report-search">
        <FaSearch /><input type="text" placeholder="Search Reports..." value={searchTerm} onChange={handleSearchChange} />
      </div>

      <div className="export-buttons">
        <button onClick={handleExportPDF}><FaFilePdf /> Export to PDF</button>
        <button onClick={handleExportExcel}><FaFileExcel /> Export to Excel</button>
        <button onClick={handlePrint}><FaPrint /> Print View</button>
      </div>

      {renderTable("Reservations Overview", filteredReservations, ["customerName", "dateTime", "numberOfGuests", "tableNumber"])}
      {renderTable("Orders Overview", filteredOrders, ["tableNumber", "items", "status"])}
      {renderTable("Inventory Overview", filteredInventory, ["itemName", "quantityOnHand", "reorderLevel"])}
      {renderTable("Kitchen Overview", filteredKitchen, ["tableNumber", "items", "status"])}
      {renderTable("Staff Overview", filteredStaff, ["staffName", "position", "shiftStart", "shiftEnd"])}
    </div>
  );
};

const renderTable = (title, data, headers) => (
  <div className="report-section">
    <h3>{title} ({data.length})</h3>
    <table>
      <thead>
        <tr>{headers.map(header => <th key={header}>{header.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {headers.map(header => (
              <td key={header}>
                {Array.isArray(item[header]) ? item[header].map(i => i.itemName).join(', ') : String(item[header])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ReportsPage;
