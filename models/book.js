const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title:  { type: String, required: true },
    author:  { type: String, required: true },
    img_Url: { type: String},
    rating:{type:String},
    isFavourite : Boolean,

  categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
      ],
},
      { timestamps: true }
);
module.exports = mongoose.model('Book', bookSchema);