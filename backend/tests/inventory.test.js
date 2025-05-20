// tests/inventory.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  app = require('../app');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Inventory API', () => {
  let itemId;

  test('POST /inventory → create item', async () => {
    const payload = {
      itemName: 'Tomato Sauce',
      quantityOnHand: 20,
      reorderLevel: 5,
      supplierInfo: 'Acme Foods'
    };
    const res = await request(app)
      .post('/inventory')
      .send(payload)
      .expect(201);

    expect(res.body).toMatchObject({
      itemName: 'Tomato Sauce',
      quantityOnHand: 20,
      reorderLevel: 5,
      supplierInfo: 'Acme Foods'
    });
    expect(res.body).toHaveProperty('_id');
    itemId = res.body._id;
  });

  test('GET /inventory → list all', async () => {
    const res = await request(app)
      .get('/inventory')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
  });

  test('GET /inventory/:id → fetch one', async () => {
    const res = await request(app)
      .get(`/inventory/${itemId}`)
      .expect(200);

    expect(res.body._id).toBe(itemId);
  });

  test('PUT /inventory/:id → update one', async () => {
    const res = await request(app)
      .put(`/inventory/${itemId}`)
      .send({ quantityOnHand: 15 })
      .expect(200);

    expect(res.body.quantityOnHand).toBe(15);
  });

  test('DELETE /inventory/:id → delete one', async () => {
    const res = await request(app)
      .delete(`/inventory/${itemId}`)
      .expect(200);

    expect(res.body).toEqual({ message: 'Deleted successfully' });
  });
});
