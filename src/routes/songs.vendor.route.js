const router = require('express').Router();
const { createSong, getSongs, getSong, deleteSong } = require("../controllers/songs.vendor.js");

router.post("/", createSong);
router.get("/", getSongs);
router.route("/:id").get(getSong).delete(deleteSong);

module.exports = router;