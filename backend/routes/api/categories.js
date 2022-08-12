const router = require('express').Router();

const { Category } = require('../../database');

router.get('/', async (req, res) => {
    const categories = await Category.findAll();

    return res.status(200).json({ result: 'success', categories });
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    if(!name.length || typeof(name) !== 'string') {
        return res.status(400).json({ result: 'error', errors: [ 'Category name must be a string' ]});
    }

    const category = await Category.create(req.body);
    return res.status(201).json({ result: 'success', category });
})

module.exports = router;