//app and dependencies 
//express for the web app
const express = require('express')
//axios for making requests
const axios = require('axios')
//morgan for request logging
const morgan = require('morgan')
//redis for caching
const redis = require('redis')

const app = express()
const port = 3000;

//Creating redis client
const redisClient = redis.createClient();

//Middleware for request logging
app.use(morgan('dev'))

//CUSTOM MIDDLEWARE FUNCTION
function cacheMiddleware(req, res, next) {

    //req.originalUrl is the original URL of the incoming request
    const key = req.originalUrl;

    //checks if data associated with the key exists in Redis
    redisClient.get(key, (err, data) => {
        if (err) throw err

        if (data != null) {
            //Daca este gasit in cache se trimite mai departe la client
            res.send(JSON.parse(data))
        } else {
            //Daca nu, se trece la urmatorul middleware
            next()
        }
    })
}

//FETCHING THE DATA
app.get('/api/data', cacheMiddleware, async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        const data = response.data
        redisClient.setex(req.originalUrl, 3600, JSON.stringify(data))
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


app.listen(port, () => {
    console.log(`Server started on port ${port}....`)
})
