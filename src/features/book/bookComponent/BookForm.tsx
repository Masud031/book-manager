// src/features/books/components/BookForm.tsx

import { useForm } from "react-hook-form";
import type { IBook  } from "../../../types/types";


interface Props {
  initialValues?: Partial<IBook>;
  onSubmit: (data: Partial<IBook>) => void;
  submitText: string;
}

export default function BookForm({ initialValues = {}, onSubmit, submitText }: Props) {
  const { register, handleSubmit } = useForm<Partial<IBook>>({
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("title")} placeholder="Title" className="input input-bordered w-full" />
      <input {...register("author")} placeholder="Author" className="input input-bordered w-full" />
      <input {...register("genre")} placeholder="Genre" className="input input-bordered w-full" />
      <input {...register("isbn")} placeholder="ISBN" className="input input-bordered w-full" />
      <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />
      <input {...register("copies", { valueAsNumber: true })} type="number" placeholder="Copies" className="input input-bordered w-full" />
      <button type="submit" className="btn btn-primary w-full">{submitText}</button>
    </form>
  );
}
