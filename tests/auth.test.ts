import request from 'supertest';
import app from '../server/index';

describe('auth flow', () => {
  it('registers and logs in user', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const reg = await request(app)
      .post('/api/auth/register')
      .send({ email, password });

    expect(reg.status).toBe(200);

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email, password });

    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});