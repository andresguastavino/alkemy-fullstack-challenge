require('dotenv').config();
const { ENCODING_KEY } = process.env;

const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');

const { User } = require('../../database');

router.post('/register', [
    check('email', 'Email is mandatory').not().isEmpty(),
    check('email', 'Email has to be a valid email address').isEmail(),
	check('password', 'Password is mandatory').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json({ result: 'error', errors: errors.array() });	
	}
    
    const { email } = req.body;
    let user = await User.findOne({ 
        where: { email }
    });
    if(user) {
        return res.status(409).json({ result: 'error', errors: [ `Email address ${ email } is already in use` ]});
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    
	user = await User.create(req.body);

    const access_token = createToken(user);

    return res.status(201).json({ result: 'success', access_token });
});

router.post('/login', [
    check('email', 'Email is mandatory').not().isEmpty(),
    check('email', 'Email has to be a valid email address').isEmail(),
	check('password', 'Password is mandatory').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json({ result: 'error', errors: errors.array() });	
	}

    const user = await User.findOne({ 
        where: { email: req.body.email }
    });

	if(user) {
		if(!bcrypt.compareSync(req.body.password, user.password)) {
			return res.status(400).json({ result: 'error', errors: [ 'Invalid email and/or password' ]});
		}
	} else {
		return res.status(400).json({ result: 'error', errors: [ 'Invalid email and/or password' ]});
	}

    const access_token = createToken(user);
    return res.status(200).json({ result: 'success', access_token });
});

const createToken = (user) => {
	const payload = {
		userId: user.id,
		createdAt: moment().unix(),
		expiresAt: moment().add(60, 'minutes').unix()
	};

	return jwt.encode(payload, ENCODING_KEY);
};


module.exports = router;