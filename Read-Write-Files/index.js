//Write a Node.js program that reads data from one file, modifies it in some way, and then writes the modified data to another file.

const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const modifiedData = data.toUpperCase();

    fs.writeFile('output.txt', modifiedData, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Written succesfully ! ");
    })
})