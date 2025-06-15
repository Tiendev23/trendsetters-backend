const Product = require('../models/Product');

// Get all products
exports.getAll = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // Dữ liệu sẽ có `createdAt` và `updatedAt`
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Create new product
exports.create = async (req, res) => {
    try {
        const product = new Product(req.body);
        const saved = await product.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update product
exports.update = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete product
exports.remove = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
