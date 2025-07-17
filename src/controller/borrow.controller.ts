/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response } from 'express';
import Borrow from '../models/Borrow.model';
import { Book } from '../models/Book.models';



export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate, borrowerName } = req.body;

    // 1. Check if the book exists
    const existingBook = await Book.findById(book);
    const bookNotFound = !existingBook;
    const insufficientCopies = existingBook && existingBook.copies < quantity;

    if (bookNotFound || insufficientCopies) {
      const message = bookNotFound
        ? 'Book not found'
        : `Only ${existingBook!.copies} copies available`;

      const statusCode = bookNotFound ? 404 : 400;

      res.status(statusCode).json({
        success: false,
        message,
      });
    } else {
      // 2. Create borrow record
      const borrowed = await Borrow.create({ book, quantity, dueDate, borrowerName });

      // 3. Update book copies and availability
      existingBook.copies -= quantity;
      if (existingBook.copies === 0) {
        existingBook.available = false;
      }
      await existingBook.save();

      // 4. Send response
      const responseData = {
        _id: borrowed._id,
        book: borrowed.book,
        quantity: borrowed.quantity,
        dueDate: borrowed.dueDate,
        borrowerName: borrowed.borrowerName,
        createdAt: borrowed.createdAt,
        updatedAt: borrowed.updatedAt,
      };

      res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: responseData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to borrow book',
      error,
    });
  }
};




// Get all borrowed books
export const getAllBorrowedBooks = async (_req: Request, res: Response) => {
  try {
    const data = await Borrow.find().populate('book','title isbn');
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch borrowed books', error });
  }
};
// Return a borrowed book
export const returnBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Borrow.findByIdAndDelete(id);

    if (!deleted) {
       res.status(404).json({ message: 'Borrowed record not found' });
    }

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to return book', error });
  }
};
// Get a single borrowed book by ID
export const getAllBorrowedBooksById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const borrowed = await Borrow.findById(id);

    if (!borrowed) {
       res.status(404).json({
        success: false,
        message: 'Borrowed record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Borrowed record fetched successfully',
      data: borrowed,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch borrowed record',
      error,
    });
  }
};

// GET /api/borrow/stats
export const getBorrowStats = async (req: Request, res: Response) => {
  try {
    const stats = await Borrow.aggregate([
      {
        $lookup: {
          from: "books", // name of the books collection
          localField: "book",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $group: {
          _id: "$bookInfo._id",
          title: { $first: "$bookInfo.title" },
          isbn: { $first: "$bookInfo.isbn" },
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error getting borrow stats", error });
  }
};




