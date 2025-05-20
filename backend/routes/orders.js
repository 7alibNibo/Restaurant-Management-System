// routes/orders.js
const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const events  = require('../events');

// GET  /orders       → list all
router.get('/', async (req, res, next) => {
  try {
    const list = await Order.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// POST /orders       → create
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    events.emit('order:created', newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

// GET  /orders/:id   → fetch one
router.get('/:id', async (req, res, next) => {
  try {
    const one = await Order.findById(req.params.id);
    if (!one) return res.status(404).json({ message: 'Not found' });
    res.json(one);
  } catch (err) {
    next(err);
  }
});

// PUT  /orders/:id   → update one
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    events.emit('order:updated', updated);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /orders/:id → delete one
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    events.emit('order:deleted', deleted);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
