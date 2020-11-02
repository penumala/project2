const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    book_type: {
      type: String,
      default: '',
      unique: true,
    },
  genre: {
      type: String,
      default: '',
      unique: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
