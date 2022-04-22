const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jsonwebtoken.verify(token, process.env.SECRET);
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token,
        });

        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate!' });
    }
}

module.exports = auth;
