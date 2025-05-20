// db.js
// ───────────────────────────────────────────────────────────────
// 1) Load .env first so process.env.MONGO_URI is defined
require('dotenv').config();

const mongoose = require('mongoose');

// 2) Build Mongo URI (fallback to local)
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/restaurant_rms';

// 3) Connect (singleton)
mongoose
  .connect(mongoUri)
  .then(() => console.log('✔️  MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
