// tests/orders.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  app = require('../app'); // loads your db.js singleton
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Orders API', () => {
  let orderId;

  test('POST /orders → create order', async () => {
    const payload = {
      tableNumber: 5,
      items: [{ itemName: 'Burger', quantity: 2 }],
      specialRequests: 'No onions'
    };
    const res = await request(app)
      .post('/orders')
      .send(payload)
      .expect(201);

    expect(res.body).toMatchObject({
      tableNumber: 5,
      specialRequests: 'No onions',
      status: 'pending'
    });
    expect(res.body).toHaveProperty('_id');
    orderId = res.body._id;
  });

  test('GET /orders → list all', async () => {
    const res = await request(app)
      .get('/orders')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
  });

  test('GET /orders/:id → fetch one', async () => {
    const res = await request(app)
      .get(`/orders/${orderId}`)
      .expect(200);

    expect(res.body._id).toBe(orderId);
  });

  test('PUT /orders/:id → update one', async () => {
    const res = await request(app)
      .put(`/orders/${orderId}`)
      .send({ status: 'ready' })
      .expect(200);

    expect(res.body.status).toBe('ready');
  });

  test('DELETE /orders/:id → delete one', async () => {
    const res = await request(app)
      .delete(`/orders/${orderId}`)
      .expect(200);

    expect(res.body).toEqual({ message: 'Deleted successfully' });
  });
});
