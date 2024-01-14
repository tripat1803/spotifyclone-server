const router = require('express').Router();
const { searchSongs } = require('../controllers/songs.user');

router.get("/", searchSongs);

module.exports = router;