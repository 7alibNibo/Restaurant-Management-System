// routes/inventory.js
const express       = require('express');
const router        = express.Router();
const InventoryItem = require('../models/InventoryItem');
const events        = require('../events');

// GET  /inventory       → list all
router.get('/', async (req, res, next) => {
  try {
    const list = await InventoryItem.find().sort({ itemName: 1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// POST /inventory       → create
router.post('/', async (req, res, next) => {
  try {
    const newItem = await InventoryItem.create(req.body);
    events.emit('inventory:created', newItem);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

// GET  /inventory/:id   → fetch one
router.get('/:id', async (req, res, next) => {
  try {
    const one = await InventoryItem.findById(req.params.id);
    if (!one) return res.status(404).json({ message: 'Not found' });
    res.json(one);
  } catch (err) {
    next(err);
  }
});

// PUT  /inventory/:id   → update one
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    events.emit('inventory:updated', updated);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /inventory/:id → delete one
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    events.emit('inventory:deleted', deleted);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
