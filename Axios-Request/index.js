const axios = require('axios')
const { error } = require('console')

axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then((response)=>{
        console.log('Response data : ', response.data)
    })
    .catch((error)=>{
        console.log('Error : ', error)
    })