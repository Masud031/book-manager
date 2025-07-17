// src/types/types.ts

// src/types/globalTypes.ts
export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
  img?: string; // 
}

// export interface IBorrow extends Document {
//   book: Types.ObjectId;
//   quantity: number;
//   dueDate: Date;
//   borrowerName: string; // ✅ Ensure it's here
//   createdAt?: Date;
//   updatedAt?: Date;
// }



export interface IBorrow {
  _id?: string;

  book: string | {
    _id: string;
    title: string;
    isbn: string;
  };

  borrowerName: string; // Moved outside 'book'

  quantity: number;
  dueDate: string;

  createdAt?: string;
  updatedAt?: string;
}






// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'admin' | 'user';
// }

// export interface BorrowRecord {
//   id: string;
//   bookId: string;
//   userId: string;
//   borrowDate: string;
//   returnDate?: string;
// }
