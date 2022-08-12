const router = require('express').Router();

const { Operation } = require('../../database');

// Gets all operations that belong to the user whose id is passed in parameters
router.get('/', async (req, res) => {
    const { userId } = req.body;

    const operations = await Operation.findAll({
        limit: 10,
        where: { user_id: userId },
        order: [['date', 'DESC']]
    });

    return res.status(200).json({ result: 'success', operations });
});

router.post('/', async (req, res) => {
    const { userId } = req.body;


});

module.exports = router;