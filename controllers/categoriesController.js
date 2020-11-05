const router = require('express').Router();
const Category = require('../models/category');

// NEW Category FORM
router.get('/new', (req, res) => {
  res.render('categories/new.ejs');
});


// CREATE A NEW Category
router.post('/', async (req, res) => {
    try {
      let newCategory = await Category.create(req.body);
      //res.send(newCategory);
    res.redirect("/books")
    } catch (error) {
      res.send(error);
    }
  });


  // EDIT
router.get('/:id/edit', (req, res) => {
  Category.findById(req.params.id, (error, foundcategory) => {
     res.render('categories/edit.ejs', {
     category: foundcategory
      
     })
   })
 })
module.exports = router;