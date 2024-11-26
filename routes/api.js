// routes/api.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { products } = require('../data/products');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/products', (req, res) => {
    res.json(products);
});

router.post('/products', upload.single('image'), (req, res) => {
    const { name, description, sku, price, publishDate, slug } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : 'images/default.png';
    const newProduct = { id: products.length + 1, name, description, image, sku, price: price + ' SEK', publishDate, slug };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

module.exports = router;