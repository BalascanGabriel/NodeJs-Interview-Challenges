const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../products.json')


const readProducts = () =>{
    const rawData = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(rawData)
}

module.exports = {
    readProducts,
    dataPath
}