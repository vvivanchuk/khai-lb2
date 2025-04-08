const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts); // Send the filtered products as a JSON response
});

router.get('/products/id/:id', (request, response) => {
   const { id } = request.params;

   const product = products.find(product => product.id === parseInt(id, 10));

   if (product) {
      response.json(product); // Повертаємо знайдений продукт
   } else {
      response.status(404).send('Product not found'); // Повертаємо 404, якщо продукт не знайдено
   }
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});

module.exports = router;