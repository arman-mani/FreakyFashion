// data/products.js

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
const getRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

module.exports = { products, getRandomProducts };