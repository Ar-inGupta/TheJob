const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = "cerh5983hrvenfivnvef";
const authMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await User.findById(decoded.user.id);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
