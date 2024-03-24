const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "User is required"],
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        artist: [
            {
                type: String,
                trim: true,
            }
        ],
        album: {
            type: String,
            required: [true, "Album is required"],
            trim: true,
        },
        genre: {
            type: String,
            trim: true,
        },
        releaseDate: {
            type: Date,
            required: [true, "Release date is required"],
        },
        songUrl: {
            publicId: {
                type: String
            },
            url: {
                type: String,
                required: [true, "Song url is required"],
            }
        },
        imageUrl: {
            type: String,
            required: [true, "Image url is required"],
        },
    },
    {
        timestamps: true,
    }
);

exports.Song = mongoose.model("songs", songSchema);