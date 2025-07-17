/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../bookApi";
import React from "react";
import Swal from "sweetalert2";

type BookFormValues = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
};

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetBookByIdQuery(id || "");
  const [updateBook] = useUpdateBookMutation();

  const { register, handleSubmit, reset } = useForm<BookFormValues>();

  React.useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book, reset]);

  const onSubmit = async (data: BookFormValues) => {
    const updatedBook = { ...data, available: data.copies > 0 };
    try {
      await updateBook({ id: id!, updatedBook }).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Book Updated",
        text: "The book details have been successfully updated.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      // ✅ Only navigate after successful alert
      navigate("/books");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the book.",
      });
    }
  };

  if (isLoading) return <p>Loading book...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Title" className="input input-bordered w-full" />
        <input {...register("author")} placeholder="Author" className="input input-bordered w-full" />
        <input {...register("genre")} placeholder="Genre" className="input input-bordered w-full" />
        <input {...register("isbn")} placeholder="ISBN" className="input input-bordered w-full" />
        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />
        <input {...register("copies", { valueAsNumber: true })} type="number" placeholder="Copies" className="input input-bordered w-full" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white  shadow-sm hover:shadow transition duration-150">Update Book</button>
      </form>
    </div>
  );
}
