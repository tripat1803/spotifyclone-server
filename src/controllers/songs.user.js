const { Song } = require('../models/songs.model.js');

exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json({
            message: "Fetched songs successfully",
            songs
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}

exports.searchSongs = async (req, res) => {
    try {
        const { search, limit, page } = req.query;
        if (!search) {
            return res.status(400).json({
                message: "Search query is required"
            })
        }

        let limitQuery = parseInt(limit) || 10;
        let pageQuery = parseInt(page) || 1;
        let skip = limitQuery * (pageQuery - 1);

        const songs = await Song.find({
            $or: [{
                name: {
                    $regex: search,
                    $options: "i"
                }
            }, {
                album: {
                    $regex: search,
                    $options: "i"
                }
            }]
        }).skip(skip).limit(limitQuery);

        res.status(200).json({
            message: "Fetched songs successfully",
            songs
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}

exports.homeData = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            {
                $group: {
                    _id: "$artist",
                    songs: {
                        $push: "$$ROOT"
                    }
                }
            },
            {
                $limit: 8
            },
            {
                $project: {
                    _id: 0,
                    artist: "$_id",
                    songs: 1
                }
            }
        ]);

        res.status(200).json({
            message: "Fetched home data successfully",
            songs
        });
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}