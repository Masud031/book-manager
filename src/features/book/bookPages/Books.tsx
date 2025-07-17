import { useEffect, useState } from 'react';
import BookCard from '../../../features/book/BookCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert
import type { IBook } from '../../../types/types';

interface BooksProps {
  limit?: number;
}

const Books = ({ limit }: BooksProps) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/books?limit=1000')
      .then(res => {
        const allBooks: IBook[] = res.data.data;
        const limitedBooks = limit ? allBooks.slice(0, limit) : allBooks;
        setBooks(limitedBooks);
      })
      .catch(err => console.error("Failed to load books", err));
  }, [limit]);

  const handleEdit = (id: string) => navigate(`/edit-book/${id}`);
  const handleView = (id: string) => navigate(`/books/${id}`);
  const handleBorrow = (id: string) => navigate(`/borrow/${id}`);

  const handleDelete = async (id: string) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setBooks(prev => prev.filter(book => book._id !== id));

        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The book has been deleted.',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error('Delete failed', err);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'Something went wrong while deleting the book.',
        });
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Discover Your Next Book</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard
            key={book._id}
            book={book}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBorrow={handleBorrow}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;
