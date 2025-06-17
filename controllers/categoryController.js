// controllers/categoryController.js
const Category = require('../models/Category');
const multer = require('multer');
const path = require('path');

// Cấu hình multer để lưu trữ ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Đảm bảo có thư mục uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file ảnh với timestamp để tránh trùng
    },
});

const upload = multer({ storage: storage });

// Lấy tất cả danh mục
exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Thêm mới danh mục
exports.create = async (req, res) => {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : null; // Lấy đường dẫn ảnh từ multer

    const category = new Category({
        name,
        description,
        image,
    });

    try {
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Cập nhật danh mục
exports.update = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xóa danh mục
exports.delete = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Danh mục đã bị xóa' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Sử dụng multer để upload ảnh cho danh mục
exports.uploadImage = upload.single('image'); // Đây là middleware multer để xử lý ảnh
