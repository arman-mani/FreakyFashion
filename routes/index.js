const express = require('express');
const router = express.Router();
const { products, getRandomProducts } = require('../data/products');

router.get('/', (_req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const filteredProducts = products.filter(product => product.publishDate <= today);
    res.render('home', { products: filteredProducts });
});

router.get('/products', (req, res) => {
    res.render('products', { products });
});

router.get('/products/:slug', (req, res) => {
    const product = products.find(p => p.slug === req.params.slug);
    if (!product) {
        return res.status(404).send('Produkt hittades inte');
    }
    const similarProducts = getRandomProducts(products.filter(p => p.slug !== product.slug), 3);
    res.render('product-details', { product, similarProducts });
});

module.exports = router;