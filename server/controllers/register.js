async function handleRegister (req, res, db, bcrypt) {

 const { name, email, password } = req.body;
 const saltRounds = 10;
 const hash = bcrypt.hashSync(password, saltRounds);

 if(!name || !email || !password) {
        return res.status(400).json('Fill in all the registration fields');
    }
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!emailPattern.test(email)) {
        return res.status(400).json('Invalid email format');
    }

    if(password.length < 6) {
        return res.status(400).json('password needs to be at least 6 characters')
    }

 try {

    const newUser = await db('users')
        .insert({
            name,
            email,
            hash,
            joined: new Date()
        })
        .returning('*');

        return res.json({
            message: 'Registration sucesful',
            user: newUser[0]
        })

 }catch(err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json('server error');
 } 
 
};

export default handleRegister;