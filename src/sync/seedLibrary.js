require("../config/db");
const Library = require("../models/Library");

const seedPosts = () => {
  const LibraryData = [
    {
      bookid: 1,
      bookName: "HarryPotter",
      genre: "Science Fiction",
      authorName: "J.K.Rowling",
      quantity: 10
    },
    {
      bookid: 2,
      bookName: "Inception",
      genre: "Science Fiction",
      authorName: "Nolan",
      quantity: 7
    },
    {
      bookid: 3,
      bookName: "Interstellar",
      genre: "Science Fiction",
      authorName: "Christopher",
      quantity: 4
    },
    {
      bookid: 4,
      bookName: "Infinity War",
      genre: "Science Fiction",
      authorName: "Russo Brothers",
      quantity: 6
    },
    {
      bookid: 5,
      bookName: "Endgame",
      genre: "Science Fiction",
      authorName: "Madhu",
      quantity: 3
    },
    {
      bookid: 6,
      bookName: "Lord of rings",
      genre: "Fantasy",
      authorName: "Trion",
      quantity: 7
    },
    {
      bookid: 7,
      bookName: "Game of thrones",
      genre: "Fantasy",
      authorName: "D.B.Weiss",
      quantity: 2
    },
    {
      bookid: 8,
      bookName: "Dark",
      genre: "Fantasy",
      authorName: "Wolrich",
      quantity: 9
    },
    {
      bookid: 9,
      bookName: "Money Heist",
      genre: "Fantasy",
      authorName: "Borah",
      quantity: 5
    },
    {
      bookid: 10,
      bookName: "Breaking bad",
      genre: "Fantasy",
      authorName: "Walter White",
      quantity: 7
    },
  ];

  LibraryData.forEach(item => {
    const post = new Library({
      bookid: item.bookid,
      bookName: item.bookName,
      genre: item.genre,
      authorName: item.authorName,
      quantity: item.quantity
    });
    post
      .save()
      .then(console.log)
      .catch(console.error);
  });
};

const clearDB = () => {
  Library.remove({})
    .then(console.log)
    .catch(console.error);
};

//clearDB();
//seedPosts();

module.exports = seedPosts;
