import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './app/middleware/errorMiddleware.js';
import connectDB from './app/config/dbConnect.js';
import userRoutes from './app/routes/userRoutes.js';
import dotenv from 'dotenv';
import morgan from 'morgan';


// Générer une clé secrète aléatoire de 256 bits

dotenv.config();
connectDB();

const app = express();

//middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running....');
});

//morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//routes
app.use('/api/users', userRoutes);


//error middleware
app.use(notFound);
app.use(errorHandler);

//listening
const PORT = process.env.PORT || 8089;

app.listen(PORT, () => {
  console.log(`----- Server running on port ${PORT} --------`);
});
