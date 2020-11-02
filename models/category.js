const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    book_type: {
      type: String,
      default: '',
     
    },
  genre: {
      type: String,
      default: '',
    
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
