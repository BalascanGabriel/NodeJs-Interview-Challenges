const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

//Array of books to store
const books = []

app.get('/', (req, res) => {
    res.json(books)
})

app.post('/books',(req,res)=>{
    const newBook = req.body
    console.log(newBook)
    books.push(newBook)
    res.status(201).json(newBook)
})

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;
    // Update the book with the given ID in the 'books' array
    res.json(updatedBook);
  });
  
  // Delete a book by ID
  app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    // Remove the book with the given ID from the 'books' array
    res.sendStatus(204); // No content
  });

app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
})
