const multer = require("multer");
const path = require("path");

async function parser(req, res, next) {
  const maxSize = 2 * 1024 * 1024;

  const upload = multer({
    // storage: storage,
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
    limits: { fileSize: maxSize },
  }).single("img");

  upload(req, res, function (err) {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        throw new Error(err.message);
      } else if (err) {
        // An unknown error occurred when uploading.
        throw new Error(err.message);
      }

      next();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });
}

module.exports = parser;
