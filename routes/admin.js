// routes/admin.js
const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    res.render('admin/products/admin-products');
});

router.get('/products/new', (req, res) => {
    res.render('admin/products/new');
});

module.exports = router;