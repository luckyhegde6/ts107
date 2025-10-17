import request from 'supertest';
import { createApp } from '../src/app';


const app = createApp();


describe('integration', () => {
test('CRUD user lifecycle', async () => {
const createRes = await request(app).post('/api/users').send({ name: 'IntUser', email: 'int@x.com' });
expect(createRes.status).toBe(201);
const id = createRes.body.id;


const getRes = await request(app).get(`/api/users/${id}`);
expect(getRes.status).toBe(200);


const listRes = await request(app).get('/api/users');
expect(listRes.body.length).toBeGreaterThan(0);


const updateRes = await request(app).put(`/api/users/${id}`).send({ name: 'Updated' });
expect(updateRes.status).toBe(200);


const delRes = await request(app).delete(`/api/users/${id}`);
expect(delRes.status).toBe(204);
});
});