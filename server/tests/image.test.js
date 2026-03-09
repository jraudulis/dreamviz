import request from 'supertest';
import app from '../app.js';
import { db } from '../dbConnection.js';

describe('Image generation test', ()=> {

       beforeEach(async () => {
        // delete leftover user first
        await db('users').where('email', 'alice-image@example.com').del();

        // create fresh user
        await request(app).post('/register').send({
            name: 'Alice',
            email: 'alice-image@example.com',
            password: 'password123'
        });
    });

    it('Should generate image with valid token', async()=> {

      const loginRes = await request(app).post('/signin').send({
        email: 'alice-image@example.com',
        password: 'password123'
    });

    const token = loginRes.body.token;

        const res = await request(app).post('/generate-image')
        .set('Authorization', `Bearer ${token}`)
        .send({prompt: 'beatiful sunrise'})

        expect(res.status).toBe(200);
    });

    it('Should return 400 status code for empty prompt', async() =>{

        const loginRes = await request(app).post('/signin').send({
        email: 'alice-image@example.com',
        password: 'password123'
    });

        const token = loginRes.body.token;

        const res = await request(app).post('/generate-image')
        .set('Authorization', `Bearer ${token}`)
        .send({})

        expect(res.status).toBe(400);
    });

    it('Should return 401 code with no token', async() =>{
        const res = await request(app).post('/generate-image')
        .send({prompt: 'stunning sunset'})

        expect(res.status).toBe(401);
    });

    it('Should return 403 for invlaid token', async() =>{
        const res = await request(app).post('/generate-image')
        .set('Authorization', `Bearer invalid token`)
        .send({prompt: 'Green nature'})

        expect(res.status).toBe(403);
    })

       afterAll(async () => {
        await db.destroy(); // close connection
    });

});