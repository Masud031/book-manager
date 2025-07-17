import express from 'express';
import { borrowBook, getAllBorrowedBooks, getAllBorrowedBooksById, getBorrowStats, returnBook } from '../../src/controller/borrow.controller';

const router = express.Router();

router.post('/', borrowBook);
router.get('/', getAllBorrowedBooks);
router.get('/:id', getAllBorrowedBooksById);
router.delete('/:id', returnBook);
router.get("/stats", getBorrowStats);
// router.get('/', getBorrowSummary); 

export default router;
