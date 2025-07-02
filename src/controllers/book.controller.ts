import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json({ message: "Book deleted successfully" });
};
