const router = require('express').Router();

const checkToken = require('../../middlewares/checkToken');

const operationsRouter = require('./operations');
const categoriesRouter = require('./categories');
const authRouter = require('./auth');

router.use('/operations', [ checkToken ], operationsRouter);
router.use('/categories', [ checkToken ], categoriesRouter);
router.use('/auth', authRouter);

module.exports = router;