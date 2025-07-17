// src/features/books/pages/BookList.tsx
import { useGetBooksQuery, useDeleteBookMutation } from "../bookApi";
// import BookTable from "../components/BookTable";
import { useNavigate } from "react-router-dom";
import BookTable from "../bookComponent/bookTable";

export default function BookList() {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
    }
  };

  const handleEdit = (id: string) => navigate(`/edit-book/${id}`);
  const handleBorrow = (id: string) => navigate(`/borrow/${id}`);
  const handleDetails = (id: string) => navigate(`/books/${id}`);

  if (isLoading) return <p>Loading books...</p>;
  if (isError || !books) return <p>Failed to load books.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Books</h2>
        <button onClick={() => navigate("/create-book")} className="btn btn-primary">
          Add New Book
        </button>
      </div>
      <BookTable
        books={books}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBorrow={handleBorrow}
        onView={handleDetails}
      />
    </div>
  );
}
