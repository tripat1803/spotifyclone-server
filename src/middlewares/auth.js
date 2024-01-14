const jwt = require('jsonwebtoken');

exports.verifyAuth = async (req, res, next) => {
    try {
        const token = req.cookies['x-auth-token'];
        if (!token) {
            return res.status(401).json({
                message: 'No token, authorization denied'
            });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        if (!verify) {
            return res.status(401).json({
                message: 'Token verification failed, authorization denied'
            });
        }

        req.user_id = verify._id;
        next();
    } catch (err) {
        res.status(400).json({ message: "Token is not valid", err });
    }
}