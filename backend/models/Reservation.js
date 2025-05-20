// models/Reservation.js
const mongoose = require('mongoose');
const events   = require('../events');

const reservationSchema = new mongoose.Schema({
  customerName:   { type: String, required: true },
  tableNumber:    { type: Number, required: true },
  dateTime:       { type: Date,   required: true },
  numberOfGuests: { type: Number, required: true },
  status: {
    type:    String,
    enum:    ['pending','confirmed','cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

reservationSchema.post('save',           doc => events.emit('reservation:changed', { action: 'save',   doc }));
reservationSchema.post('findOneAndUpdate', function(doc) {
  events.emit('reservation:changed', { action: 'update', doc });
});
reservationSchema.post('findOneAndDelete', function(doc) {
  events.emit('reservation:changed', { action: 'delete', doc });
});

module.exports = mongoose.model('Reservation', reservationSchema);
