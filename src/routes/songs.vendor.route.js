const router = require('express').Router();
const { upload } = require('../../config/multer.js');
const { createSong, getSongs, getSong, deleteSong } = require("../controllers/songs.vendor.js");

router.post("/", upload.single("song"), createSong);
router.get("/", getSongs);
router.route("/:id").get(getSong).delete(deleteSong);

module.exports = router;