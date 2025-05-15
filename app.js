var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var reservationsRouter  = require('./routes/reservations');
var ordersRouter        = require('./routes/orders');
var inventoryRouter     = require('./routes/inventory');
var staffScheduleRouter = require('./routes/staffSchedule');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/reservations',  reservationsRouter);
app.use('/orders',        ordersRouter);
app.use('/inventory',     inventoryRouter);
app.use('/staff-schedules', staffScheduleRouter);

module.exports = app;

