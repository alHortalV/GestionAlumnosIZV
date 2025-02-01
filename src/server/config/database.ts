import mongoose from 'mongoose';
import { Config } from '../../config/Config';

export const connectDB = async () => {
  try {
    await mongoose.connect(Config.databaseURL);
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};