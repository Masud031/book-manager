import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { useBorrowBookMutation } from '../../../features/borrow/borrowApi';
import { useNavigate } from 'react-router-dom';
import { clearSelectedBook } from '../../book/bookSlice';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert

const BorrowBook: React.FC = () => {
  const selectedBook = useAppSelector((state) => state.book.selectedBook);
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [borrowerName, setBorrowerName] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) {
      Swal.fire('Error', 'No book selected', 'error');
      return;
    }

    if (quantity > selectedBook.copies) {
      Swal.fire('Insufficient Copies', `Only ${selectedBook.copies} copies available`, 'warning');
      return;
    }

    try {
      await borrowBook({
        book: selectedBook._id,
        borrowerName,
        dueDate: borrowDate,
        quantity,
      }).unwrap();

      dispatch(clearSelectedBook());

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Book borrowed successfully!',
        confirmButtonColor: '#3085d6',
      });

      navigate('/borrow-summary');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to borrow book', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Borrow Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Book Title</label>
          <input
            type="text"
            value={selectedBook?.title || ''}
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Borrower Name</label>
          <input
            type="text"
            required
            value={borrowerName}
            onChange={(e) => setBorrowerName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Borrow Date</label>
          <input
            type="date"
            required
            value={borrowDate}
            onChange={(e) => setBorrowDate(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            required
            min={1}
            max={selectedBook?.copies || 1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Borrow
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
