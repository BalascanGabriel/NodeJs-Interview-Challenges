// Create a Node.js script that reads the contents of multiple files asynchronously and combines them into a single output file in a specific order


const fs = require('fs').promises

async function combineFiles() {
    try {
        const file1Content = await fs.readFile('input1.txt', 'utf-8');
        const file2Content = await fs.readFile('input2.txt', 'utf-8');
        const file3Content = await fs.readFile('input3.txt', 'utf-8');

        const combineFiles = file1Content + '\n' + file2Content + '\n' + file3Content;

        //!!!!!
        //When using await, you don't need to provide a callback function to fs.writeFile because await itself handles the asynchronous operation.
        await fs.writeFile('output.txt', combineFiles);
        console.log('Files combined with success !');

    } catch (error) {
        console.error(error)
        return
    }
}


combineFiles()