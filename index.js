const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Books = require("./models/books.models");
initializeDatabase();

const express = require("express");
const app = express();
app.use(express.json());

// const jsonData = fs.readFileSync("books.json", "utf-8");
// const booksData = JSON.parse(jsonData);
// function seedData() {
//   try {
//     for (const book of booksData) {
//       const newBook = new Books({
//         title: book.title,
//         author: book.author,
//         publishedYear: book.publishedYear,
//         genre: book.genre,
//         language: book.language,
//         country: book.country,
//         rating: book.rating,
//         summary: book.summary,
//         coverImageUrl: book.coverImageUrl,
//       });
//       newBook.save();
//     }
//   } catch (error) {
//     console.log("Error while seeding", error);
//   }
// }

// const bookData = {
//   title: "Lean In",
//   author: "Sheryl Sandberg",
//   publishedYear: 2012,
//   genre: ["Non-fiction", "Business"],
//   language: "English",
//   country: "United States",
//   rating: 4.1,
//   summary:
//     "A book about empowering women in the workplace and achieving leadership roles.",
//   coverImageUrl: "https://example.com/lean_in.jpg",
// };
// const bookData2 = {
//   title: "Shoe Dog",
//   author: "Phil Knight",
//   publishedYear: 2016,
//   genre: ["Autobiography", "Business"],
//   language: "English",
//   country: "United States",
//   rating: 4.5,
//   summary:
//     "An inspiring memoir by the co-founder of Nike, detailing the journey of building a global athletic brand.",
//   coverImageUrl: "https://example.com/shoe_dog.jpg",
// };
async function createData(bookData) {
  try {
    const book = new Books(bookData);
    const saveBook = await book.save();
    return saveBook;
  } catch (error) {
    throw error;
  }
}

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.post("/books", async (req, res) => {
  try {
    const newBook = await createData(req.body);
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add hotel" });
  }
});

const readAllBooks = async () => {
  try {
    const readBooks = await Books.find();
    return readBooks;
  } catch (error) {
    throw error;
  }
};

app.get("/books", async (req, res) => {
  try {
    const books = await readAllBooks();
    if (books.length) {
      res.json(books);
    } else {
      res.status.json(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

const findBookByName = async (bookName) => {
  try {
    const bookByName = await Books.findOne({ title: bookName });
    return bookByName;
  } catch (error) {
    throw error;
  }
};

app.get("/books/:bookName", async (req, res) => {
  try {
    const book = await findBookByName(req.params.bookName);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

async function readBooksByAuthor(authorName) {
  try {
    const booksByAuthor = await Books.find({ author: authorName });
    return booksByAuthor;
  } catch (error) {
    throw error;
  }
}

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const bookByAuthor = await readBooksByAuthor(req.params.authorName);
    if (bookByAuthor) {
      res.json(bookByAuthor);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Books." });
  }
});

const findBooksByGenre = async (bookGenre) => {
  try {
    const booksByGenre = await Books.find({ genre: bookGenre });
    return booksByGenre;
  } catch (error) {
    throw error;
  }
};

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const bookByGenre = await findBooksByGenre(req.params.bookGenre);
    if (bookByGenre) {
      res.json(bookByGenre);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Books." });
  }
});

async function findBooksByYear(bookYear) {
  try {
    const booksByYear = await Books.find({ publishedYear: bookYear });
    return booksByYear;
  } catch (error) {
    throw error;
  }
}

app.get("/books/year/:bookYear", async (req, res) => {
  try {
    const bookByYear = await findBooksByYear(req.params.bookYear);
    if (bookByYear) {
      res.json(bookByYear);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Books." });
  }
});

async function updateRatingById(bookId, dataToUpdate) {
  try {
    const updatedData = await Books.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updatedData;
  } catch (error) {
    throw error;
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBooks = await updateRatingById(req.params.bookId, req.body);
    if (updatedBooks) {
      res.status(200).json({
        message: "Books updated Successfully",
        updatedBook: updatedBooks,
      });
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update books." });
  }
});

const updateDataByTitle = async (bookName, dataToUpdate) => {
  try {
    const updatedData = await Books.findOneAndUpdate(
      { title: bookName },
      dataToUpdate,
      {
        new: true,
      }
    );
    return updatedData;
  } catch (error) {
    throw error;
  }
};

app.post("/books/title/:bookName", async (req, res) => {
  try {
    const updatedData = await updateDataByTitle(req.params.bookName, req.body);
    if (updatedData) {
      res.status(200).json({
        message: "Book updated successfully.",
        updatedData: updatedData,
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Books" });
  }
});

const deleteBookById = async (bookId) => {
  try {
    const deletedData = await Books.findByIdAndDelete(bookId);
    return deletedData;
  } catch (error) {
    throw error;
  }
};

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedData = await deleteBookById(req.params.bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book." });
  }
});

const PORT = 4600;
app.listen(PORT, () => {
  console.log("The server is running on port: ", PORT);
});
// seedData();
