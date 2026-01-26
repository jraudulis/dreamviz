import jwt from 'jsonwebtoken';

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json('Missing authorization header')
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json('Missing token');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(403).json('invalid token');
        }

        req.user = payload;
        next();
    });

    
};

export default authenticateJWT;