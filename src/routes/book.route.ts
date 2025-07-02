import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller";

const router = express.Router();

router.get("/", asyncHandler(getBooks));
router.get("/:id", asyncHandler(getBookById));
router.post("/", asyncHandler(createBook));
router.patch("/:id", asyncHandler(updateBook));
router.delete("/:id", asyncHandler(deleteBook));

export default router;
