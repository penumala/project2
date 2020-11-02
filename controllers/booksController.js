const router = require('express').Router();
const Book = require('../models/book');
const Category = require('../models/category');

 router.get('/', async(req, res) => {
  let allBooks = await Book.find()
  res.render('books/index.ejs', {books:allBooks})
  console.log(allBooks);
})

  
  router.get('/new', async (req, res) => {
    let allCategories = await Category.find({});
    res.render('books/new.ejs', { categories: allCategories });
  });
  
  router.get('/:id', async (req, res) => {
    let allCategories = await Category.find({});
  
    let foundBook = await Book.findById(req.params.id).populate({
      path: 'categories',
      options: { sort: { name: 1 } },
    });
  
    res.render('books/show.ejs', {
      book: foundBook,
      categories: allCategories,
    });
  });
  

// UPDATE
router.put('/:id', (req, res) => {
    
    Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (error, updatedModel) => {
        res.redirect('/books')
      }
    )
  })



  router.post('/', async (req, res) => {
    console.log(req.body);
    let book = await Book.create(req.body);
    res.redirect(`/books/${book.id}`);
  });
  
  router.put('/:bookId/categories', async (req, res) => {
    let foundBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      {
        $push: {
          categories: req.body.categories,
        },
      },
      { new: true, upsert: true }
    );
    console.log(foundBook);
    res.redirect(`/books/${foundBook.id}`);
  });


  //delete
router.delete("/:id",(req,res)=>{
    //const index = req.params.id
    Book.findByIdAndRemove(req.params.id,(error) => {
    res.redirect('/books');
    });
    });

// EDIT
router.get('/:id/edit', (req, res) => {
   Book.findById(req.params.id, (error, foundbook) => {
      res.render('books/edit.ejs', {
       book: foundbook
       
      })
    })
  })
    

module.exports = router;