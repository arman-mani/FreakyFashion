const express = require('express');
const path = require('path');
const fs = require('fs');

// Importera routes
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api');

const app = express();
const PORT = 3000;

// upload dir
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

// Error hantering
app.use((req, res) => {
    console.log('404 - Rutt hittades inte:', req.url);
    res.status(404).send('404 - Sidan hittades inte');
});

app.use((err, req, res, next) => {
    console.error('Fel:', err);
    res.status(500).send('Något gick fel på servern');
});

// Starta server
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
    console.log(`API-endpoint tillgänglig på http://localhost:${PORT}/api/products`);
});

module.exports = app;