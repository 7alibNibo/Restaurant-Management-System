// routes/staffSchedule.js
const express       = require('express');
const router        = express.Router();
const StaffSchedule = require('../models/StaffSchedule');
const events        = require('../events');

// GET  /staff-schedules       → list all
router.get('/', async (req, res, next) => {
  try {
    const list = await StaffSchedule.find().sort({ shiftStart: 1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// POST /staff-schedules       → create
router.post('/', async (req, res, next) => {
  try {
    const newShift = await StaffSchedule.create(req.body);
    events.emit('staffSchedule:created', newShift);
    res.status(201).json(newShift);
  } catch (err) {
    next(err);
  }
});

// GET  /staff-schedules/:id   → fetch one
router.get('/:id', async (req, res, next) => {
  try {
    const one = await StaffSchedule.findById(req.params.id);
    if (!one) return res.status(404).json({ message: 'Not found' });
    res.json(one);
  } catch (err) {
    next(err);
  }
});

// PUT  /staff-schedules/:id   → update one
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await StaffSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    events.emit('staffSchedule:updated', updated);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /staff-schedules/:id → delete one
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await StaffSchedule.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    events.emit('staffSchedule:deleted', deleted);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
