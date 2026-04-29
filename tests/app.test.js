const request = require('supertest');
const app = require('../app');

describe('App Endpoints', () => {
  test('GET / should return status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(400);
  });

  test('GET /health should return status 200 and UP', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('UP');
  });

  test('GET / should contain "Standard Application" when feature flag is off', async () => {
    process.env.NEW_UI_ENABLED = 'false';
    const res = await request(app).get('/');
    expect(res.text).toContain('Standard Application');
  });

  test('GET / should contain "Modern Dashboard" when feature flag is on', async () => {
    process.env.NEW_UI_ENABLED = 'true';
    const res = await request(app).get('/');
    expect(res.text).toContain('Modern Dashboard');
  });
});
