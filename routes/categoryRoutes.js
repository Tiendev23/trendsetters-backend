// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


// Đảm bảo bạn đã định nghĩa đúng route
router.get('/', categoryController.getAll); // GET tất cả danh mục
router.post('/', categoryController.create); // POST thêm mới danh mục
router.put('/:id', categoryController.update); // PUT cập nhật danh mục
router.delete('/:id', categoryController.delete); // DELETE xóa danh mục

module.exports = router;
