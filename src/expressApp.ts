import express from 'express';
import cors from 'cors';
import bookRouter from './bcrouts/book.route';
import borrowRouter from './bcrouts/borrow.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);

// app.get('/', (req, res) => {
//   res.send('Server is working!');
// });

export default app;
