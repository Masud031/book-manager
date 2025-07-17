// src/features/books/components/BookCard.tsx

import { useAppDispatch } from '@/redux/hook';
import type { IBook } from '../../types/types';
import { setSelectedBook } from './bookSlice';

interface Props {
  book: IBook;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBorrow: (id: string) => void;
}

export default function BookCard({ book, onView, onEdit, onDelete, onBorrow }: Props) {
 const dispatch = useAppDispatch();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between h-full">
      <img src={book.img} alt={book.title} className="w-full h-48 object-cover rounded-md mb-3" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-1">Author: {book.author}</p>
        <p className="text-gray-500 text-sm mb-1">Genre: {book.genre}</p>
        <p className="text-gray-500 text-sm mb-1">ISBN: {book.isbn}</p>
        <p className="text-sm font-medium">Copies: {book.copies}</p>
        <p className={`text-sm ${book.available ? 'text-green-600' : 'text-red-600'}`}>
          {book.available ? "Available" : "Unavailable"}
        </p>
      </div>
 <div className="mt-3 flex flex-wrap justify-center gap-2">
  <button
    className="px-2 py-0.5 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm hover:shadow transition duration-150"
    onClick={() => onView(book._id)}
  >
    View
  </button>
  <button
    className="px-2 py-0.5 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-sm hover:shadow transition duration-150"
    onClick={() => onEdit(book._id)}
  >
    Edit
  </button>
  <button
    className="px-2 py-0.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm hover:shadow transition duration-150"
    onClick={() => onDelete(book._id)}
  >
    Delete
  </button>
  <button
  onClick={() => {
    dispatch(setSelectedBook(book));
    onBorrow(book._id);
  }}
  className="px-2 py-0.5 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm hover:shadow transition duration-150"
>
  Borrow
</button>

</div>



    </div>
  );
}
