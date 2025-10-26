import Book from "../Models/book.Models.js";
// create
export const createBook = async (req, res) => {
  const { BookName, BookTitle, BookAuthor, SellingPrice, PublishDate } =
    req.body;

  if (!BookName || !BookTitle || !BookAuthor || !SellingPrice || !PublishDate) {
    return res.status(400).json({ message: "All fields are Required" });
  }
  try {
    const newBook = await Book.create(req.body);
    res.status(200).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// read

export const allBook = async (req, res) => {
  try {
    const books = await Book.find({});

    res.status(200).json({
      success: true,
      message: "books fetched successfully",
      books,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// read by id
export const bookById = async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { BookName, BookTitle, BookAuthor, SellingPrice, PublishDate } =
    req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // ensures validation rules in your schema apply
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      Book: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      Book: deleteBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
