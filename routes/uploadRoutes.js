const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Cấu hình nơi lưu file
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Chấp nhận file ảnh
const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(null, isValid);
};

const upload = multer({ storage, fileFilter });

// API POST ảnh
router.post('/', upload.single('image'), (req, res) => {
    res.json({ imageUrl: `http://localhost:5000/${req.file.path}` });
});

module.exports = router;
