const router = require('express').Router();

router.use('/user', require('./user.route.js'));
router.use('/songs', require('./songs.route.js'));

module.exports = router;