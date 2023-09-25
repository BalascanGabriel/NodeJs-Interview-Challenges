require('dotenv').config()
const express = require('express')
var app = express()

const jwt = require('jsonwebtoken')

//Permite aplicatiei sa foloseasca jsoane din bidy
app.use(express.json())

const posts = [
    {
        username: "Gabe",
        post: "Caut mixer dj Pioneer"
    },
    {
        username: "Matei",
        post: "Vand consola dj Traktor"
    }
]

app.get('/', (req, res) => {
    res.send("Salut vere")
})

app.get('/posts', (req, res) => {
    res.json(posts)

})

app.post('/login', (req, res) => {

    const username = req.body.username
    const user = {name : username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken : accessToken})
})

app.listen(3000,()=>{
    console.log('Server started.........')
})