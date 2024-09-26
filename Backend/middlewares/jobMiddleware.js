const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = "cerh5983hrvenfivnvef";
const jobMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await User.findById(decoded.user.id);
        if(req.user.role!="employer"){throw(err);}
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Access Denied' });
    }
};

module.exports = jobMiddleware;
