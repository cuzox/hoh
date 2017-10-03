let utils = module.exports

utils.imageFilter = (req, file, cb) => {
    // Accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}
