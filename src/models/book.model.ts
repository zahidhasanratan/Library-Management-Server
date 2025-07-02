import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    genre: String,
    isbn: String,
    description: String,
    copies: Number,
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
