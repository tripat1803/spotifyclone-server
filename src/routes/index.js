const { verifyAuth } = require('../middlewares/auth.js');

const router = require('express').Router();

router.use('/user', require('./user.route.js'));
router.use('/songs/user', require('./songs.user.route.js'));
router.use('/songs', verifyAuth, require('./songs.vendor.route.js'));
router.use('/playlist', verifyAuth, require('./playlist.route.js'));

module.exports = router;