require('dotenv').config();
const { ENCODING_KEY } = process.env;

const jwt = require('jwt-simple');
const moment = require('moment');

const invalidOrExpiredToken = (res) => {
    return res.status(401).json({ result: 'error', errors: [ 'Invalid or expired access_token' ]});
}

module.exports = (req, res, next) => {
    if(!req.headers.authorization)	{
		return res.status(401).json({ result: 'error', errors: [ 'You need to include the Bearer access_token inside the headers of the request' ]});
	}
    
    let access_token;
    try {
        const bearer = req.headers.authorization.split(' ')[0].toLowerCase();
        if(bearer !== 'bearer') {
            return invalidOrExpiredToken(res);
        }

        access_token = req.headers.authorization.split(' ')[1];
    } catch(error) {
		return invalidOrExpiredToken(res);
    }
	
	let payload = {};
	
	try {
		payload = jwt.decode(access_token, ENCODING_KEY);
	} catch(error) {
		return invalidOrExpiredToken(res);
	}
	
	if(payload.expiresAt < moment().unix()) {
		return invalidOrExpiredToken(res);
	}

    req.body.userId = payload.userId;

    next();
};