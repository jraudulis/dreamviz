import jwt from 'jsonwebtoken';
import { db } from '../server.js';

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json('Missing authorization header')
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json('Missing token');
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if(err) return res.status(403).json('invalid token');

        const user = await db('users')
            .where({id: payload.id})
            .first();

        if(!user) return res.status(403).json('user no longer exists')
        

        req.user = payload;
        next();
    });

    
};

export default authenticateJWT;