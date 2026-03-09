import request from 'supertest';
import app from '../app.js';
import { db } from '../dbConnection.js';


describe('Database registration test', ()=> {

     beforeEach(async ()=> {
            await db('users').where({email: 'alice@example.com'}).del();
        });

    it('Should return status code 200 for sucesful registration', async ()=> {
        const res = await request(app).post('/register')
        .send(
        {
            "name": "Alice",
            "email": "alice@example.com",
            "password": "password123"
        }
        )
        const user = await db('users').where({email:'alice@example.com' }).first();
        expect(user).toBeDefined();
        expect(user.name).toBe('Alice');

        expect(res.statusCode).toBe(200);
    })

});

describe('Database signin test', () => {

   beforeEach(async () => {
    await db('users').where({ email: 'alice@example.com' }).del(); // 👈 add this
  });

  afterEach(async () => {
    await db('users').where({ email: 'alice@example.com' }).del();
  });

  it('Should return 200 for successful signin', async () => {

    await request(app).post('/register').send({
      name: "Alice",
      email: "alice@example.com",
      password: "password123"
    });

    const res = await request(app).post('/signin').send({
      email: "alice@example.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

  });

  it('Should return 401 for wrong password', async () => {
    

    await request(app).post('/register').send({
      name: "Alice",
      email: "alice@example.com",
      password: "password123"
    });

    const res = await request(app).post('/signin').send({
      email: "alice@example.com",
      password: "wrongpass"
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.token).toBeUndefined();

  });

    afterAll(async ()=>{
    await db.destroy();
  })

});
