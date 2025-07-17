import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../bookApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ Import SweetAlert

type BookFormValues = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
};

export default function AddBook() {
  const { register, handleSubmit } = useForm<BookFormValues>();
  const [addBook] = useAddBookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: BookFormValues) => {
    const newBook = { ...data, available: data.copies > 0 };
    try {
      await addBook(newBook).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Book Added",
        text: "The book was successfully added to the library.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      navigate("/books");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Add Failed",
        text: "Something went wrong while adding the book.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Title" className="input input-bordered w-full" />
        <input {...register("author")} placeholder="Author" className="input input-bordered w-full" />
        <input {...register("genre")} placeholder="Genre" className="input input-bordered w-full" />
        <input {...register("isbn")} placeholder="ISBN" className="input input-bordered w-full" />
        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />
        <input {...register("copies", { valueAsNumber: true })} type="number" placeholder="Copies" className="input input-bordered w-full" />

        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("available")} defaultChecked className="checkbox" />
          <span>Available</span>
        </label>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm hover:shadow transition duration-150">
          Add Book
        </button>
      </form>
    </div>
  );
}
