const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000


//Configure multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

//view will be ejs files
app.set('view engine', 'ejs');

//other middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.get('/', (req, res) => {
    res.render('upload-form', { error: null }); // Define the 'error' variable as null
  });
  

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.render('upload-form', { error: 'Please select a file' });
    }
    res.render('upload-success', { filename: req.file.originalname });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });