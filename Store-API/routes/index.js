const express = require('express')
const router = express.Router()

//routes for navigating the page
router.get('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    res.render('index', {products : products});
})

router.get('/about', (req, res) => {
    res.render('about'); 
});

router.get('/contact', (req, res) => {
    res.render('contact'); 
});

module.exports = router;
