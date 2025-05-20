// routes/reservations.js
const express     = require('express');
const router      = express.Router();
const Reservation = require('../models/Reservation');
const events      = require('../events');  // ← import your event bus

// GET /reservations → list all
router.get('/', async (req, res, next) => {
  try {
    const list = await Reservation.find().sort({ dateTime: 1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// POST /reservations → create
router.post('/', async (req, res, next) => {
  try {
    const newRes = await Reservation.create(req.body);
    events.emit('reservation:created', newRes);          // ← emit event
    res.status(201).json(newRes);
  } catch (err) {
    next(err);
  }
});

// GET /reservations/:id → fetch one
router.get('/:id', async (req, res, next) => {
  try {
    const one = await Reservation.findById(req.params.id);
    if (!one) return res.status(404).json({ message: 'Not found' });
    res.json(one);
  } catch (err) {
    next(err);
  }
});

// PUT /reservations/:id → update one
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    events.emit('reservation:updated', updated);         // ← emit event
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /reservations/:id → delete one
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    events.emit('reservation:deleted', deleted);         // ← emit event
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
