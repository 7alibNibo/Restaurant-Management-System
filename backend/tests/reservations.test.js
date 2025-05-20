// tests/reservations.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  app = require('../app');                // Loads your db.js singleton
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Reservations API', () => {
  let resId;

  test('POST /reservations', async () => {
    const res = await request(app)
      .post('/reservations')
      .send({
        customerName:  'Test User',
        tableNumber:    5,
        dateTime:      '2025-05-20T19:00:00.000Z',
        numberOfGuests: 2
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    resId = res.body._id;
  });

  test('GET /reservations', async () => {
    const res = await request(app).get('/reservations');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  test('GET /reservations/:id', async () => {
    const res = await request(app).get(`/reservations/${resId}`);
    expect(res.status).toBe(200);
    expect(res.body.customerName).toBe('Test User');
  });

  test('PUT /reservations/:id', async () => {
    const res = await request(app)
      .put(`/reservations/${resId}`)
      .send({ customerName: 'Updated Name' });
    expect(res.status).toBe(200);
    expect(res.body.customerName).toBe('Updated Name');
  });

  test('DELETE /reservations/:id', async () => {
    const res = await request(app).delete(`/reservations/${resId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Deleted successfully');
  });
});
