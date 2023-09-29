require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
const port = process.env.PORT

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Brian',
        title: 'Post 2',
    },
    {
        username: 'Kyle',
        title: 'Post 43'
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Welcome to home page</h1>')
})

app.get('/posts', authenticateToken, (req, res) => {
    console.log('Posts:', posts); // Debugging line
    res.json(posts.filter(post => post.username === req.user.name))

})

app.post('/login', (req, res) => {

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

//Auth middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
        return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        console.log('User:', req.user); // Add this line for debugging
        next()
    })

}


app.listen(port, () => {
    console.log(`Server started on port ${port}.....`)
})