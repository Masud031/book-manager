import express from 'express';
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById
} from '../../src/controller/book.controller';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
// router.put('/:id', updateBook);
router.patch('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router;

