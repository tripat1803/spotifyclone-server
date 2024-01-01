const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/user.js');

router
    .route("/")
        .post(loginUser);
router
    .route("/register")
        .post(registerUser);

module.exports = router;