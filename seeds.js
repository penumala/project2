const mongoose = require('mongoose');

const Book = require('./models/book');
const Category = require('./models/category');

//const mongoURI = 'mongodb://localhost:27017/daniel-project2';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/daniel-project2';
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established');
  }
);

(async function () {
  //await mongoose.connection.dropCollection('categories');
  //await mongoose.connection.dropCollection('books');
  // CREATE TWO CATEGORIES
  const book_type = await Category.create({
    book_type: 'non fiction',
    genre: 'biography',
  });

  const book_fiction = await Category.create({
    book_type: 'fiction',
   genre: 'sci-fi',
  });

  // CREATE A NEW Book
  const biography = new Book({
    title: 'My Life',
    author: "Obama",
    img_Url: "https://images.com",
    rating:"****",
    isFavourite : true,
    categories: [book_type],
  });

   
    const fiction= new Book({
        title: 'Lord of the Onion Rings',
        author: " Bill BoB",
        img_Url: "https://images.com",
        rating:"**",
        isFavourite : false,
        categories: [book_fiction],
      });

  // // PUSH THE CATEGORIES ONTO THE BOOK"S
  // // Categories ARRAY

  

//biography.books.push(book_type);
//fiction.books.push(book_fiction); // associated!
biography.save(function (err, savedbiography) {
    if (err) {
      console.log(err);
    } else {
      console.log('biography book is ', savedbiography);
    }
  });

  fiction.save(function (err, savedfiction) {
    if (err) {
      console.log(err);
    } else {
      console.log('fiction book is ', savedfiction);
    }
  });


})();