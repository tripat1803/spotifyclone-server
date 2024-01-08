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
            required: [true, "Genre is required"],
            trim: true,
        },
        releaseDate: {
            type: Date,
            required: [true, "Release date is required"],
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
        }
    },
    {
        timestamps: true,
    }
);

exports.Song = mongoose.model("songs", songSchema);