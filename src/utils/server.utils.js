const jwt = require("jsonwebtoken");

exports.sendToken = (req, res, user) => {
    try {
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        return res.cookie("x-auth-token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Some error occured"
        })
    }
}