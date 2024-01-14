const router = require('express').Router();
const { searchSongs, homeData } = require('../controllers/songs.user');

router.get("/", searchSongs);
router.get("/home", homeData);

module.exports = router;