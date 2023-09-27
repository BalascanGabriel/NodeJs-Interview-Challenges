const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')


// Route for rendering the list of products (index page)
router.get('/', productsController.renderProductsPage);

// Route for rendering the create new product form
router.get('/new', productsController.renderNewProductForm);

// Route for creating a new product
router.post('/create', productsController.createNewProduct);


module.exports = router;

