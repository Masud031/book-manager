// src/features/books/components/BookTable.tsx
import type { IBook } from "../../../types/types";


interface Props {
  books: IBook[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBorrow: (id: string) => void;
  onView: (id: string) => void;
}

export default function BookTable({ books, onEdit, onDelete, onBorrow, onView }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Copies</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id} className={book.available ? "" : "opacity-50"}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.isbn}</td>
              <td>{book.copies}</td>
              <td>{book.available ? "Yes" : "No"}</td>
              <td className="space-x-2">
                <button className="btn btn-sm btn-info" onClick={() => onView(book._id)}>View</button>
                <button className="btn btn-sm btn-warning" onClick={() => onEdit(book._id)}>Edit</button>
                <button className="btn btn-sm btn-error" onClick={() => onDelete(book._id)}>Delete</button>
                <button className="btn btn-sm btn-success" onClick={() => onBorrow(book._id)}>Borrow</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
