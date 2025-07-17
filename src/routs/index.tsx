// src/routes/router.tsx (or wherever you're defining it)

// import App from "../App";
import { createBrowserRouter } from "react-router-dom"; // make sure it's from 'react-router-dom'
import AddBook from "../features/book/bookPages/AddBook";
import BookDetails from "../features/book/bookPages/BookDetails";
import EditBook from "../features/book/bookPages/EditBook";
import BorrowBook from "../features/borrow/borrowPages/BorrowBook";
import BorrowSummary from "../features/borrow/borrowPages/BorrowSummary";
import Books from "../features/book/bookPages/Books";
import App from "@/App";
import HomeBooks from "@/features/book/bookPages/HomeBooks";
import BorrowStats from "@/features/borrow/borrowPages/BorrowStats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>, 
    children: [
      {
        path: "/", // Home route
        element:<HomeBooks/>
      },
      {
        path: "books",
        element: <Books />,
      }, 
     
      {
        path: "add-book",
        element: <AddBook />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "borrow/:bookId",
        element: <BorrowBook />,
      },
      {
        path: "/borrow/stats",
        element: <BorrowStats />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
