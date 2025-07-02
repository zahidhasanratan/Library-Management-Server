import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { quantity, dueDate } = req.body;

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ error: "Book not found" });

  // TypeScript fix — Now book is guaranteed to be non-null
  const copiesAvailable = book.copies ?? 0;

  if (copiesAvailable < quantity) {
    return res.status(400).json({ error: "Not enough copies available" });
  }

  book.copies = copiesAvailable - quantity;
  book.available = book.copies > 0;

  await book.save();

  const borrow = new Borrow({ book: bookId, quantity, dueDate });
  await borrow.save();

  res.status(201).json(borrow);
};

export const getBorrowSummary = async (_: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    { $unwind: "$bookDetails" },
    {
      $project: {
        title: "$bookDetails.title",
        isbn: "$bookDetails.isbn",
        totalQuantity: 1,
      },
    },
  ]);

  res.json(summary);
};
