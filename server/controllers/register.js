import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) throw new Error ('JWT token is not defined');

async function handleRegister (req, res, db, bcrypt) {

 const { name, email, password, confirmPassword } = req.body;
 const saltRounds = 10;

 if(!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Fill in all the registration fields'});
    }
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!emailPattern.test(email)) {
        return res.status(400).json({ error: 'Invalid email format'});
    }

    if(password.length < 6) {
        return res.status(400).json({ error: 'password needs to be at least 6 characters'})
    }

    if(password != confirmPassword) {
        return res.status(400).json({ error: 'Passwords dont match'});
    }

    const hash = bcrypt.hashSync(password, saltRounds);

 try {

    const userData = await db('users').where('email', '=', email);

    if(userData.length) {
        return res.status(409).json({ error: 'email already exists' });
    }

    const result = await db.transaction(async (trx)=> {
       const newUser = await trx('users')
       .insert({name, email, hash})
       .returning('*')
        
        
        const token = jwt.sign(
                { id: newUser[0].id},
                SECRET_KEY,
                { expiresIn: '1h'}
            );

          return {newUser, token};

    });

        return res.json({
            message: 'Registration sucesful',
            user: result.newUser[0],
            token: result.token
        });

 }catch(err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ error: 'server error'});
 } 
 
};

export default handleRegister;