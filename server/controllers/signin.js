import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) throw new Error ('JWT token is not defined')

async function handleSignin (req, res, db, bcrypt) {

    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({error: 'Fill in email and password fields'});
    }
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!emailPattern.test(email)) {
        return res.status(400).json({error: 'Invalid email format'});
    }

    if(password.length < 6) {
        return res.status(400).json({error: 'password needs to be at least 6 characters'})
    }

    try {
        const loginData = await db.select('id', 'email', 'hash', 'name').from('users').where('email', '=', email)

            if(!loginData.length) {
                return res.status(400).json({error: 'wrong email or password'})
            }
            const isValid = await bcrypt.compare(password, loginData[0].hash);

            if(isValid) {

                const token = jwt.sign(
                    { id: loginData[0].id},
                    SECRET_KEY,
                    { expiresIn: '1h'}
                );

                return res.json({

                    user: {
                        id: loginData[0].id,
                        email: loginData[0].email,
                        name: loginData[0].name
                    },
                    token: token
                });
            } 
            else return res.status(401).json({error: 'wrong user or password'})
            
    } catch(err) {
        console.error("SIGNIN ERROR:", err);
         return res.status(500).json({error: 'server error'})
    }

}

export default handleSignin;