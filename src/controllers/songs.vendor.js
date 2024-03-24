const { dataUri } = require("../../config/multer.js");
const { Song } = require("../models/songs.model.js");
const { User } = require("../models/user.model.js");
const cloud = require("../../config/cloudinary.js");

exports.createSong = async (req, res) => {
    try {
        const { title, artist, album, genre, releaseDate, imageUrl } = JSON.parse(req.body.metadata);

        let user = await User.findById(req.user_id);

        if (user && user.role !== "vendor") {
            return res.status(403).json({
                message: "You are not authorized to upload songs"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Song file is required"
            })
        }

        let songUrl = await cloud.uploader.upload(req.filepath, {
            resource_type: "auto",
            folder: "songs",
            overwrite: true,
            format: "mp3",
            audio_codec: "mp3"
        });

        const songData = await Song.create({
            userId: req.user_id,
            title,
            artist,
            album,
            genre,
            releaseDate,
            songUrl: { url: songUrl.secure_url, publicId: songUrl.public_id },
            imageUrl
        });

        res.status(201).json({
            message: "Song was uploaded successfully",
            song: songData,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

exports.getSongs = async (req, res) => {
    try {
        let songs = await Song.find({ userId: req.user_id });

        res.status(200).json({
            message: "Songs fetched successfully",
            songs,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

exports.getSong = async (req, res) => {
    try {
        let song = await Song.findOne({ _id: req.params.id, userId: req.user_id });

        if (!song) {
            return res.status(404).json({
                message: "Song not found"
            })
        }

        res.status(200).json({
            message: "Song fetched successfully",
            song,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

exports.deleteSong = async (req, res) => {
    try {
        await Song.deleteOne({ _id: req.params.id, userId: req.user_id });

        res.status(200).json({
            message: "Song deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}