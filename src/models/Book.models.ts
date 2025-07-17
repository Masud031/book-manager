import { Schema, model } from 'mongoose';

const genreOptions = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY', 'SCIENCE_FICTION'];

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: genreOptions, required: true },
    isbn: { type: String, unique: true, required: true },
    description: { type: String },
    img: { type: String, required: false },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true,
   
   }
);

export const Book = model('Book', bookSchema);
