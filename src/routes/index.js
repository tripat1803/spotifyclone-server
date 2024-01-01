const router = require('express').Router();

router.use('/user', require('./user.route.js'));

module.exports = router;