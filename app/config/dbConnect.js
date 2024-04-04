import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.PROD_MONGO_URI || 'mongodb://localhost:27017/mydatabase';
    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      family: 4, // Force to use IPv4
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
      // Assurez-vous d'ajouter cette ligne après la connexion à MongoDB
mongoose.set('useFindAndModify', false);
};

export default connectDB;
