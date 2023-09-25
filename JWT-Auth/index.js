const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const authRoutes = require('./routes/auth')


//app initialisation
const app = express()

//db connection
mongoose.connect(config.dbUrl, {useNewUrlParser : true, useUnifiedTopology: true})

//middleware for json parsing
app.use(bodyParser.json())

//import routes
app.use('/auth', authRoutes)

//Server start
app.listen(config.PORT, ()=>{
    console.log(`Server started on port ${config.PORT}....`)
})
