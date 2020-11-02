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

module.exports = router;