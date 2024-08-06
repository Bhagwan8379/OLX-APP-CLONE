const multer = require("multer")

const postStore = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})
const upload = multer({ storage: postStore }).array("images", 5)

module.exports = upload