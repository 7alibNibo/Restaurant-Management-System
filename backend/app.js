// app.js
// ───────────────────────────────────────────────────────────────
// 1) Initialize DB connection (dotenv + mongoose)
require('dotenv').config();
require('./db');

const express      = require('express');
const cors         = require('cors');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');

// 2) Route imports
const indexRouter         = require('./routes/index');
const usersRouter         = require('./routes/users');
const reservationsRouter  = require('./routes/reservations');
const ordersRouter        = require('./routes/orders');
const inventoryRouter     = require('./routes/inventory');
const staffScheduleRouter = require('./routes/staffSchedule');

// 3) Create Express app
const app = express();

// 4) Middleware
app.use(logger('dev'));
app.use(cors());                   // ← allow all origins in dev
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 5) Mount routers
app.use('/',             indexRouter);
app.use('/users',        usersRouter);
app.use('/reservations', reservationsRouter);
app.use('/orders',       ordersRouter);
app.use('/inventory',    inventoryRouter);
app.use('/staff-schedules', staffScheduleRouter);

// 6) 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 7) Mongoose validation error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      message: 'Validation failed',
      errors: messages
    });
  }
  next(err);
});

// 8) Generic error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;

// 9) Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running at http://localhost:${PORT}`);
});
