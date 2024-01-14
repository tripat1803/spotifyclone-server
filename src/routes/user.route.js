const router = require('express').Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/user.js');
const { verifyAuth } = require('../middlewares/auth.js');
const { User } = require('../models/user.model.js');
const { sendToken } = require('../utils/server.utils.js');

router
    .route("/")
    .post(loginUser);
router
    .route("/register")
    .post(registerUser)
    .get(logoutUser);
router
    .route("/verify")
    .get(verifyAuth, async (req, res) => {
        let data = await User.findById(req.user_id);
        sendToken(req, res, { _id: req.user_id });
        res.status(200).json({
            name: data.name,
            providerId: data.providerId,
            mobile: data.mobile,
            role: data.role
        });
    });

module.exports = router;