const express = require('express')
const app = express()
const port = 3000

//1. Log Middleware
app.use((req, res, next) => {
    console.log(`Request received at ${new Date()}`)
    next()
})

//2. Bpdy parsing Middleware
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


//3. Static files Middleware
app.use(express.static('public'));

//4. Custom Middleware
function customMiddleware(req, res , next){
    console.log("Custom middleware function")
    next()
}
app.use(customMiddleware)

app.get('/',(req,res) =>{
    res.send('Hello, express middleware')
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}.....`)
})