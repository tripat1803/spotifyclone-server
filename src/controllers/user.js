const { User } = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { sendToken } = require("../utils/server.utils.js");

exports.registerUser = async (req, res) => {
    try {
        const { name, providerId, password, userType, mobile } = req.body;

        if (!name || !providerId || !password || !mobile) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({
            providerId
        });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));

        let data = await (new User({
            name,
            providerId,
            password: hash,
            mobile,
            role: userType === "vendor" ? "vendor" : "user"
        })).save();

        sendToken(req, res, data);

        return res.status(201).json({
            message: "User created successfully",
            user: {
                name: data.name,
                providerId: data.providerId,
                mobile: data.mobile,
                role: data.role
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { providerId, password } = req.body;
        if (!providerId || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        
        const user = await User.findOne({
            providerId,
            role: req.query.userType === "vendor" ? "vendor" : "user"
        });
        
        if (!user) {
            return res.status(400).json({
                message: "User does not exists"
            })
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        
        sendToken(req, res, user);
        
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                name: user.name,
                providerId: user.providerId,
                mobile: user.mobile,
                role: user.role
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}

exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("x-auth-token");
        res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Some error occured",
            error: err.message
        })
    }
}