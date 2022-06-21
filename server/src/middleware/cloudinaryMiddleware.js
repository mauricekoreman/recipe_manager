const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../services/cloudinary.config");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipe_images",
    format: async () => "png",
    public_id: (req, file) => file.filename,
  },
});

async function parser(req, res, next) {
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
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
