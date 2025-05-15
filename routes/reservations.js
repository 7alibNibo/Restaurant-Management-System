const express = require('express');
const router  = express.Router();

// GET    /reservations       → list all reservations
router.get('/', (req, res) => {
  // TODO: fetch from DB
  res.json({ message: 'List all reservations' });
});

// POST   /reservations       → create a new reservation
router.post('/', (req, res) => {
  // TODO: insert into DB
  res.status(201).json({ message: 'Reservation created' });
});

// GET    /reservations/:id   → fetch one reservation
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: fetch id from DB
  res.json({ message: `Fetch reservation ${id}` });
});

// PUT    /reservations/:id   → update one reservation
router.put('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: update in DB
  res.json({ message: `Update reservation ${id}` });
});

// DELETE /reservations/:id   → delete one reservation
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: delete from DB
  res.json({ message: `Delete reservation ${id}` });
});

module.exports = router;
