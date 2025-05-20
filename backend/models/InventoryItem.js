// models/InventoryItem.js
const mongoose = require('mongoose');
const events   = require('../events');

const inventoryItemSchema = new mongoose.Schema({
  itemName:      { type: String, required: true, unique: true },
  quantityOnHand:{ type: Number, required: true, min: 0 },
  reorderLevel:  { type: Number, required: true, min: 0 },
  supplierInfo:  { type: String, default: '' }
}, { timestamps: true });

inventoryItemSchema.post('save',           doc => events.emit('inventory:changed', { action: 'save',   doc }));
inventoryItemSchema.post('findOneAndUpdate', function(doc) {
  events.emit('inventory:changed', { action: 'update', doc });
});
inventoryItemSchema.post('findOneAndDelete', function(doc) {
  events.emit('inventory:changed', { action: 'delete', doc });
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
