import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { db } from './dbConnection.js';

// import middlewear
import authenticateJWT from './middlewear/authenticateJWT.js';

// Import function controllers
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleHistory from './controllers/history.js';
import handleImageGeneration from './controllers/image.js';
import handleDelete from './controllers/delete.js';
import handleMeRequest from './controllers/me.js';


const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dreamviz.netlify.app"
  ]
}));

app.post('/register',(req, res) => {handleRegister(req, res, db, bcrypt)});
app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)});
app.get('/history', authenticateJWT, (req, res) => {handleHistory(req, res, db)});
app.get('/me', authenticateJWT, (req, res) => {handleMeRequest(req, res, db)});
app.delete('/delete/:id', authenticateJWT, (req, res) => {handleDelete(req, res, db)});
app.post('/generate-image', authenticateJWT, async (req, res) => {handleImageGeneration(req, res, db)});



export default app;