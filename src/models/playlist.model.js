const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "songs"
    }],
    name: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

exports.Playlist = mongoose.model("playlists", playlistSchema);