const express = require('express');
const router  = express.Router();

// GET    /orders       → list all orders
router.get('/', (req, res) => {
  // TODO: fetch from DB
  res.json({ message: 'List all orders' });
});

// POST   /orders       → create a new order
router.post('/', (req, res) => {
  // TODO: insert into DB
  res.status(201).json({ message: 'Order created' });
});

// GET    /orders/:id   → fetch one order
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: fetch id from DB
  res.json({ message: `Fetch order ${id}` });
});

// PUT    /orders/:id   → update one order
router.put('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: update in DB
  res.json({ message: `Update order ${id}` });
});

// DELETE /orders/:id   → delete one order
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: delete from DB
  res.json({ message: `Delete order ${id}` });
});

module.exports = router;
