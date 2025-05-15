const express = require('express');
const router  = express.Router();

// GET    /staff-schedules       → list all shifts
router.get('/', (req, res) => {
  // TODO: fetch from DB
  res.json({ message: 'List all shifts' });
});

// POST   /staff-schedules      → create a new shifts
router.post('/', (req, res) => {
  // TODO: insert into DB
  res.status(201).json({ message: 'Shifts created' });
});

// GET    /staff-schedules/:id   → fetch one shifts
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: fetch id from DB
  res.json({ message: `Fetch shifts ${id}` });
});

// PUT    /staff-schedules/:id   → update one shifts
router.put('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: update in DB
  res.json({ message: `Update shifts ${id}` });
});

// DELETE /staff-schedules/:id   → delete one shifts
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: delete from DB
  res.json({ message: `Delete shifts ${id}` });
});

module.exports = router;
