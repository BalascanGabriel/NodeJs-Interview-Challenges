const fs = require('fs')
const { parse } = require('path')

fs.readFile('posts.json', 'utf8', (err, data) => {
    if (err) throw err
    //take json data
    const parsedData = JSON.parse(data)
    //build an array of titles let's say
    const titles = parsedData.map((post) => post.title);

    parsedData.forEach((post) => {
        fs.writeFile('post-titles.json', JSON.stringify(titles), (err) => {
            if (err) throw err
            console.log('Data has been writen to the file ! ')
        })
    })
})