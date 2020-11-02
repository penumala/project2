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
      res.send(newCategory);
    } catch (error) {
      res.send(error);
    }
  });
module.exports = router;