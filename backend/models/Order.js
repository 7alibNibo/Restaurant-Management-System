// models/Order.js
const mongoose = require('mongoose');
const events   = require('../events');

const orderItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  tableNumber:     { type: Number,            required: true },
  items:           { type: [orderItemSchema], required: true },
  specialRequests: { type: String,            default: '' },
  status: {
    type:    String,
    enum:    ['pending','preparing','ready','served','cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

orderSchema.post('save',           doc => events.emit('order:changed',       { action: 'save',   doc }));
orderSchema.post('findOneAndUpdate', function(doc) {
  events.emit('order:changed', { action: 'update', doc });
});
orderSchema.post('findOneAndDelete', function(doc) {
  events.emit('order:changed', { action: 'delete', doc });
});

module.exports = mongoose.model('Order', orderSchema);
