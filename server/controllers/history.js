const handleHistory = async (req, res, db) => {

    try {

        const {id} = req.user;
        // Select history with corresponding user id
        const userHistoryData = await db('history')
            .select('*')
            .where({user_id: id})
            .orderBy('created_at', 'desc');
        // Then loop over that history data and add each image a prefix
        userHistoryData.forEach(item => {
            if (item.image && !item.image.startsWith('data:')) {
                item.image = `data:image/webp;base64,${item.image}`;
            }
        });

        res.json(userHistoryData);

    } catch(err) {
        console.error(err)
        res.status(500).json('Unable to get history');
    }

}

export default handleHistory;