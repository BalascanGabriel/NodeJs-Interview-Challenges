require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs')


//geting declared middlewares
const errorMiddleware = require('./middlewares/error-handler')
const notFoundMiddleware = require('./middlewares/not-found')

//other middlewares
app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));


const port = process.env.PORT

//routes
app.get('/', (req, res) => {

    const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))

    res.render('index', {products : products});
})

app.get('/about', (req, res) => {
    res.render('about'); 
});

app.get('/contact', (req, res) => {
    res.render('contact'); 
});

app.use(notFoundMiddleware)
app.use(errorMiddleware)

app.listen(port, (req, res) => {
    console.log(`Server started on port ${port}....`)
})