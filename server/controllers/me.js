const handleMeRequest = async (req, res, db) => {

    try {

        const {id} = req.user;
        // Select history with corresponding user id
        const userData = await db('users')
            .select('id', 'email', 'name')
            .where({id: id})
            .first();

        if(!userData) {
            return res.status(400).json({ error:'user not found' });
        }
        
        res.json({
            id: userData.id,
            email: userData.email,
            name: userData.name
        });

    } catch(err) {
        console.error('Error in in me endpoint', err)
        res.status(500).json('unable to get me request data');
    }

}

export default handleMeRequest;