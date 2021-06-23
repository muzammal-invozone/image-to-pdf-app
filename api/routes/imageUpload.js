const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require("path");

const maxSize = 5 * 1024 * 1024; // for 1MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/svg+xml"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jpeg and .svg format allowed!"));
    }
  },
  limits: { fileSize: maxSize },
}).single('image');

router.post("/", upload, (req, res, next) => {
  res.status(201).json({
    message: "success",
    path: req.file?.path
  });
});

module.exports = router;
