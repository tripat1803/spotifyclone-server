const { Playlist } = require("../models/playlist.model.js");


exports.createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        let data = await (new Playlist({
            name,
            userId: req.user._id
        })).save();

        return res.status(201).json({
            message: "Playlist created successfully",
            data
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}

exports.getPlaylists = async (req, res) => {
    try {
        let playlists = await Playlist.find({ userId: req.user_id });

        return res.status(200).json({
            message: "Playlists fetched successfully",
            playlists
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}

exports.getPlaylist = async (req, res) => {
    try {
        let playlist = await Playlist.findOne({ _id: req.params.id, userId: req.user_id });

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found"
            })
        }

        return res.status(200).json({
            message: "Playlist fetched successfully",
            playlist
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}

exports.updateSong = async (req, res) => {
    try {
        const { songId } = req.body;

        if (!songId) {
            return res.status(400).json({
                message: "Song id is required"
            })
        }

        let playlist = await Playlist.findOne({ _id: req.params.id, userId: req.user_id });

        if(playlist.songs.length === 1 && req.query.type === "remove"){
            return res.status(400).json({
                message: "Playlist must have atleast one song"
            })
        }

        let data = await Playlist.updateOne({ _id: req.params.id, userId: req.user_id }, (req.query.type === "remove") ? {
            $pull: {
                songs: songId
            }
        } : {
            $addToSet: {
                songs: songId
            }
        });

        if (data.matchedCount === 0) {
            return res.status(404).json({
                message: "Playlist not found"
            })
        }

        return res.status(200).json({
            message: "Song added to playlist successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}

exports.deletePlaylist = async (req, res) => {
    try {
        await Playlist.deleteOne({ _id: req.params.id, userId: req.user_id });

        return res.status(200).json({
            message: "Playlist deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}