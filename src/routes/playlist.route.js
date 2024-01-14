const router = require('express').Router();
const { createPlaylist, getPlaylists, getPlaylist, deletePlaylist, updateSong } = require("../controllers/playlist.js");

router.post("/", createPlaylist);
router.get("/", getPlaylists);
router.route("/:id").get(getPlaylist).delete(deletePlaylist).put(updateSong);

module.exports = router;