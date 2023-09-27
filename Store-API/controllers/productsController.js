const productModel = require('../models/productsModel')
const fs = require('fs')

//Render HOME Page
const renderProductsPage = (req, res) => {
    const products = productModel.readProducts();
    res.render('index', { products })
}

const renderNewProductForm = (req, res) => {
    res.render('new-product-form');
};

//Performing CRUD Opperations

//Create new product
const createNewProduct = (req, res) => {
    // Get data from request body
    const { title, description, price } = req.body;
    const priceAsNumber = parseInt(price);

    // Create the new product
    const newProduct = {
        title,
        description,
        price : priceAsNumber,
    };

    // Read the existing products from the JSON file
    const products = productModel.readProducts();

    // Add the new product to the products array
    products.push(newProduct);

    // Write the updated products array back to the JSON file
    fs.writeFileSync(productModel.dataPath, JSON.stringify(products, null, 2), 'utf-8');

    // Redirect to the products page or show a success message
    res.redirect('/products');
};

module.exports = {
    renderProductsPage,
    renderNewProductForm,
    createNewProduct
}