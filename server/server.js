import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import knex from 'knex';

// import middlewear
import authenticateJWT from './middlewear/authenticateJWT.js';

// Import function controllers
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleHistory from './controllers/history.js';
import handleImageGeneration from './controllers/image.js';
import handleDelete from './controllers/delete.js';
import handleMeRequest from './controllers/me.js';

// Database connection setup
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB
  }
});


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dreamviz.netlify.app"
  ]
}));
app.use(express.json());

app.post('/register',(req, res) => {handleRegister(req, res, db, bcrypt)});
app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)});
app.get('/history', authenticateJWT, (req, res) => {handleHistory(req, res, db)});
app.get('/me', authenticateJWT, (req, res) => {handleMeRequest(req, res, db)});
app.delete('/delete/:id', authenticateJWT, (req, res) => {handleDelete(req, res, db)});
app.post('/generate-image', authenticateJWT, async (req, res) => {handleImageGeneration(req, res, db)});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
