const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./app/middleware/errorMiddleware.js');
const connectDB = require('./app/config/dbConnect.js');
const userRoutes = require('./app/routes/userRoutes.js');
const dotenv = require('dotenv');
const morgan = require('morgan');

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
