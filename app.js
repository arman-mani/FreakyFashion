const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();
const PORT = 3000;

//  uppladdningsmappen
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//  EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Logger för att se alla inkommande förfrågningar 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//  multer för filuppladdningar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Produkter lagrade i minnet
const products = [
    { id: 1, name: 'Svart T-Shirt', sku: 'AAA111', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-1.png', publishDate: '2022-11-01', slug: 'svart-tshirt' },
    { id: 2, name: 'Svart T-Shirt', sku: 'BBB111', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-2.jpg', publishDate: '2022-11-02', slug: 'svart-tshirt-2' },
    { id: 3, name: 'Svart T-Shirt', sku: 'CCC111', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-3.jpg', publishDate: '2022-11-03', slug: 'svart-tshirt-3' },
    { id: 4, name: 'Svart T-Shirt', sku: 'DDD111', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-4.jpg', publishDate: '2024-11-04', slug: 'svart-tshirt-4' },
    { id: 5, name: 'Vit T-Shirt', sku: 'EEE111', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-1.jpg', publishDate: '2024-11-05', slug: 'vit-tshirt' },
    { id: 6, name: 'Vit T-Shirt', sku: 'FFF111', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-2.jpg', publishDate: '2024-11-06', slug: 'vit-tshirt-2' },
    { id: 7, name: 'Vit T-Shirt', sku: 'GGG111', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-3.jpg', publishDate: '2024-11-07', slug: 'vit-tshirt-3' },
    { id: 8, name: 'Vit T-Shirt', sku: 'HHH111', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-4.jpg', publishDate: '2024-11-08', slug: 'vit-tshirt-4' }
];

//  hämta slumpmässiga produkter
function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// GET /api/products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// POST /api/products
app.post('/api/products', upload.single('image'), (req, res) => {
    const { name, description, sku, price, publishDate, slug } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : 'images/default.png';
    const newProduct = { id: products.length + 1, name, description, image, sku, price: price + ' SEK', publishDate, slug };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Admin-routes
app.get('/admin/products', (req, res) => {
    res.render('admin/products/admin-products');
});

app.get('/admin/products/new', (req, res) => {
    res.render('admin/products/new');
});

// route för att lista alla produkter
app.get('/products', (req, res) => {
    res.render('products', { products });
});

// route för att visa EJS-filen
app.get('/', (_req, res) => {
    const today = new Date().toISOString().split('T')[0]; // dagens datum i formatet 
    const filteredProducts = products.filter(product => product.publishDate <= today); // Filtrera produkter baserat på publiceringsdatum

    res.render('home', { products: filteredProducts });
});

// route för att visa produktdetaljer
app.get('/products/:slug', (req, res) => {
    const product = products.find(p => p.slug === req.params.slug);
    if (!product) {
        return res.status(404).send('Produkt hittades inte');
    }

    const similarProducts = getRandomProducts(products.filter(p => p.slug !== product.slug), 3); // Hämta 3 slumpmässiga liknande produkter

    res.render('product-details', { product, similarProducts });
});

// Felhantering
app.use((req, res) => {
    console.log('404 - Rutt hittades inte:', req.url);
    res.status(404).send('404 - Sidan hittades inte');
});

app.use((err, req, res, next) => {
    console.error('Fel:', err);
    res.status(500).send('Något gick fel på servern');
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
    console.log(`API-endpoint tillgänglig på http://localhost:${PORT}/api/products`);
});