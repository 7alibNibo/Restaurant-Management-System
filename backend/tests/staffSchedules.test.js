// tests/staffSchedules.test.js
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

describe('Staff Schedules API', () => {
  let shiftId;

  test('POST /staff-schedules → create shift', async () => {
    const payload = {
      staffName: 'Jane Doe',
      position: 'Server',
      shiftStart: '2025-05-20T15:00:00.000Z',
      shiftEnd:   '2025-05-20T23:00:00.000Z'
    };
    const res = await request(app)
      .post('/staff-schedules')
      .send(payload)
      .expect(201);

    expect(res.body).toMatchObject({
      staffName: 'Jane Doe',
      position: 'Server'
    });
    expect(res.body).toHaveProperty('_id');
    shiftId = res.body._id;
  });

  test('GET /staff-schedules → list all', async () => {
    const res = await request(app)
      .get('/staff-schedules')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
  });

  test('GET /staff-schedules/:id → fetch one', async () => {
    const res = await request(app)
      .get(`/staff-schedules/${shiftId}`)
      .expect(200);

    expect(res.body._id).toBe(shiftId);
  });

  test('PUT /staff-schedules/:id → update one', async () => {
    const res = await request(app)
      .put(`/staff-schedules/${shiftId}`)
      .send({ position: 'Host' })
      .expect(200);

    expect(res.body.position).toBe('Host');
  });

  test('DELETE /staff-schedules/:id → delete one', async () => {
    const res = await request(app)
      .delete(`/staff-schedules/${shiftId}`)
      .expect(200);

    expect(res.body).toEqual({ message: 'Deleted successfully' });
  });
});
