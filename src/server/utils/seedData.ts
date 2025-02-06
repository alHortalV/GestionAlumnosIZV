import { connectDB } from '../config/database';
import Student from '../models/Student';
import Seat from '../models/Seat';

async function seedData() {
  try {
    await connectDB();
    await Promise.all([
      Student.deleteMany({}),
      Seat.deleteMany({})
    ]);

    const seats = Array.from({ length: 25 }, (_, index) => ({
      seatNumber: index,
      isOccupied: false
    }));
    await Seat.insertMany(seats);
  } catch (error) {
    console.error('Error insertando datos de ejemplo:', error);
    process.exit(1);
  }
}

seedData();