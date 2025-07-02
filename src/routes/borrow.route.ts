import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { borrowBook, getBorrowSummary } from "../controllers/borrow.controller";

const router = express.Router();

router.post("/:bookId", asyncHandler(borrowBook));
router.get("/summary", asyncHandler(getBorrowSummary));

export default router;
