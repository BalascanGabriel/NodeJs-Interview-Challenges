//dependencies
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
//jsonwebtoken for auth
const jwt = require('jsonwebtoken')
const authenticateToken = require('./middleware/authMiddleware')

//app initialisation and server
const app = express()
const port = process.env.PORT || 3000

//Engine for the views
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//MIDLEWARE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//STATIC FILES FROM PUBLIC
app.use(express.static(__dirname + '/public'))

//DB CONNECTION
mongoose.connect('mongodb://localhost/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//CHECK CONNECTION
mongoose.connection.once('open', () => {
    console.log('Connected to DB !')
})


//TO DO: Routes
const tasksRoutes = require('./routes/tasksRoutes');
app.use('/tasks', tasksRoutes)



app.get('/protected', authenticateToken, (req,res)=>{
    res.send(`Welcome, ${req.user.username}! This is a protected route.`);

})

app.get('/', (req, res) => {
    res.redirect('/tasks');
})


//START THE SERVER
app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
})