const multer = require("multer");
const path = require("path");

const ROOT_PATH = "C:/Users/tripa/OneDrive/Desktop/Clones/Spotify/spotifyclone-mongo";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, ROOT_PATH+"/tmp");
    },
    filename: (req, file, cb) => {
        let fileName = file.originalname+"_"+Date.now()+path.extname(file.originalname);
        req.filepath = ROOT_PATH+"/tmp/"+fileName;
        cb(null, fileName);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype.includes("audio/mpeg")){
            cb(null, false);
        }
        cb(null, true);
    }
});

module.exports = {
    upload
}