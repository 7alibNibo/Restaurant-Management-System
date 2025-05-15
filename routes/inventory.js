const express = require('express');
const router  = express.Router();

// GET    /inventory      → list all items
router.get('/', (req, res) => {
  // TODO: fetch from DB
  res.json({ message: 'List all items' });
});

// POST   /inventory       → create a new item
router.post('/', (req, res) => {
  // TODO: insert into DB
  res.status(201).json({ message: 'Item created' });
});

// GET    /inventory/:id   → fetch one item
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: fetch id from DB
  res.json({ message: `Fetch item ${id}` });
});

// PUT    /inventory/:id   → update one item
router.put('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: update in DB
  res.json({ message: `Update item ${id}` });
});

// DELETE /inventory/:id   → delete one item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: delete from DB
  res.json({ message: `Delete item ${id}` });
});

module.exports = router;
