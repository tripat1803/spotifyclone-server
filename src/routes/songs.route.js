const router = require('express').Router();
const { createSong, getSongs, getSong, deleteSong } = require("../controllers/songs.js");
const { verifyAuth } = require('../middlewares/auth.js');

router.post("/", verifyAuth, createSong);
router.get("/", verifyAuth, getSongs);
router.route("/:id").get(verifyAuth, getSong).delete(verifyAuth, deleteSong);

module.exports = router;