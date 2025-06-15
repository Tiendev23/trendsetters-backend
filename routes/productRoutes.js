const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const upload = require('../middleware/upload');

// Upload ảnh riêng
router.post('/upload', upload.single('image'), (req, res) => {
    const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ imageUrl: filePath });
});

// CRUD sản phẩm
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
