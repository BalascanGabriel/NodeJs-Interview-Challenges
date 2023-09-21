const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

// Load environment variables from .env file
require('dotenv').config();

//AM RAMAS LA MINUTUL 9:05 -> https://www.youtube.com/watch?v=mbsmsi7l3r4

const port = process.env.PORT

//Middleware
app.use(express.json())

const posts = [
    {
        username: 'Gabe',
        title: 'Ba, azi invat despre JWT'
    },
    {
        username: 'Pescaru',
        title: 'Bine vere, bafta !'
    }
]

app.get('/', (req, res) => {
    res.send("Hello vere")
})

app.get('/all-posts', (req, res) => {
    res.json(posts);
})

app.post('/login', (req, res) => {

    const username = req.body.username
    const user = { name: username }


   const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN)
   res.json({accessToken : accesToken})
})

app.listen(port, () => {
    console.log(`Server started on port ${port}.....`)
})

