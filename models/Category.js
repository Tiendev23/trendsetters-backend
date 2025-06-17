// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Tên danh mục
    description: { type: String, required: true }, // Mô tả danh mục
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
