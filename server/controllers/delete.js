

const handleDelete = async (req, res, db) => {

    const userId = req.user.id;
    const imageId = req.params.id;
    
try {
    const deleteImage = await db('history')
        .where({id: imageId})
        .andWhere({user_id: userId})
        .del();
    
        await res.json('deleted sucesfully');

    } catch(err) {
        console.log(err);
        res.status(500).json('Error deleting');
        
    }
    
};

export default handleDelete;