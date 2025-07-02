import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    quantity: Number,
    dueDate: Date,
  },
  { timestamps: true }
);

export const Borrow = mongoose.model("Borrow", borrowSchema);
