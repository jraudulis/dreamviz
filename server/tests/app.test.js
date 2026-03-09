import request from 'supertest';
import app from '../app.js';

describe('Basic server test', ()=> {
    it('Should return 404 for unknow routes', async() => {
        const res = await request(app).get('/unknown');
        expect(res.statusCode).toBe(404);
    })
});
