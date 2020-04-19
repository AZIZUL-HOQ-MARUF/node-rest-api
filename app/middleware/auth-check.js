const jwt = require('jsonwebtoken'),
    AppResponse = require('../app-response');
module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_PRIVATE_KEY);
        next();
    } catch (error) {
        return res.status(401).json(new AppResponse(res.statusCode, null, 'Authentication Failed'));
    }
}