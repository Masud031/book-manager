import React from 'react';
import { useGetAllBorrowsQuery } from '../../../features/borrow/borrowApi';

const BorrowSummary: React.FC = () => {
  const { data: borrows, isLoading, isError } = useGetAllBorrowsQuery();

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error loading borrow summary</div>;

  if (!Array.isArray(borrows)) {
    return <div className="text-red-500 text-center mt-4">Invalid borrow data format</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-2">
      <h2 className="text-2xl font-bold mb-4 text-center">Borrow Summary</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Borrower</th>
              <th className="border p-2">Book Title</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">ISBN</th>
              <th className="border p-2">Total Q.Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow) => (
              <tr key={borrow._id}>
                <td className="border p-2">{borrow.borrowerName}</td>
                <td className="border p-2">
                  {typeof borrow.book === 'string' ? borrow.book : borrow.book.title}
                </td>
                <td className="border p-2">
                  {new Date(borrow.dueDate).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {typeof borrow.book === 'string' ? 'N/A' : borrow.book.isbn}
                </td>
                <td className="border p-2">{borrow.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {borrows.map((borrow) => (
          <div
            key={borrow._id}
            className="bg-white rounded-lg shadow p-4 border border-gray-200"
          >
            <p><strong>Borrower:</strong> {borrow.borrowerName}</p>
            <p><strong>Book Title:</strong> {typeof borrow.book === 'string' ? borrow.book : borrow.book.title}</p>
            <p><strong>ISBN:</strong> {typeof borrow.book === 'string' ? 'N/A' : borrow.book.isbn}</p>
            <p><strong>Due Date:</strong> {new Date(borrow.dueDate).toLocaleDateString()}</p>
            <p><strong>Quantity:</strong> {borrow.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowSummary;
