const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Logger to see all incoming requests (helps with debugging)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API endpoints
const products = [
    { id: 1, name: 'Svart T-Shirt', sku: 'AAA111', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-1.png', publishDate: '2024-10-01', slug: 'svart-tshirt' },
    { id: 2, name: 'Svart T-Shirt', sku: 'BBB111', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-2.jpg', publishDate: '2022-10-02', slug: 'svart-tshirt-2' },
    { id: 3, name: 'Svart T-Shirt', sku: 'CCC111', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-3.jpg', publishDate: '2022-10-03', slug: 'svart-tshirt-3' },
    { id: 4, name: 'Svart T-Shirt', sku: 'DDD111', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-4.jpg', publishDate: '2022-12-04', slug: 'svart-tshirt-4' },
    { id: 5, name: 'Vit T-Shirt', sku: 'EEE111', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-1.jpg', publishDate: '2022-10-05', slug: 'vit-tshirt' },
    { id: 6, name: 'Vit T-Shirt', sku: 'FFF111', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-2.jpg', publishDate: '2022-10-06', slug: 'vit-tshirt-2' },
    { id: 7, name: 'Vit T-Shirt', sku: 'GGG111', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-3.jpg', publishDate: '2022-10-07', slug: 'vit-tshirt-3' },
    { id: 8, name: 'Vit T-Shirt', sku: 'HHH111', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-4.jpg', publishDate: '2025-10-08', slug: 'vit-tshirt-4' }
];

// Function to get random products
function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// GET /api/products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// POST /api/products
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Admin routes
app.get('/admin/products', (req, res) => {
    res.render('admin/products/admin-products');
});

app.get('/admin/products/new', (req, res) => {
    res.render('admin/products/new');
});

// Route to serve the EJS file
app.get('/', (_req, res) => {
    const today = new Date().toISOString().split('T')[0]; // today's date in 'YYYY-MM-DD' format
    const filteredProducts = products.filter(product => product.publishDate <= today); // Filter products based on publish date

    res.render('home', { products: filteredProducts });
});

// Route to serve product details
app.get('/products/:slug', (req, res) => {
    const product = products.find(p => p.slug === req.params.slug);
    if (!product) {
        return res.status(404).send('Produkt hittades inte');
    }

    const similarProducts = getRandomProducts(products.filter(p => p.slug !== product.slug), 3); // Get 3 random similar products

    res.render('product-details', { product, similarProducts });
});

// Error handling
app.use((req, res) => {
    console.log('404 - Route not found:', req.url);
    res.status(404).send('404 - Sidan hittades inte');
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Något gick fel på servern');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API endpoint available at http://localhost:${PORT}/api/products`);
});