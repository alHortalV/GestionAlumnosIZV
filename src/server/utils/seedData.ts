import { connectDB } from '../config/database';
import Student from '../models/Student';
import Seat from '../models/Seat';

async function seedData() {
  try {
    await connectDB();

    // Limpiar datos existentes
    await Promise.all([
      Student.deleteMany({}),
      Seat.deleteMany({})
    ]);

    // Crear asientos
    const seats = Array.from({ length: 25 }, (_, index) => ({
      seatNumber: index,
      isOccupied: false
    }));
    await Seat.insertMany(seats);

    // Crear algunos estudiantes de ejemplo
    const students = [
      { name: 'Marta Pizt', assignedSeat: 0 },
      { name: 'Alejandro Hortal', assignedSeat: 1 },
      { name: 'Yoel Ramírez', assignedSeat: 2 }
    ];

    for (const studentData of students) {
      const student = new Student({
        ...studentData,
        currentSeat: studentData.assignedSeat
      });
      await student.save();

      // Actualizar el asiento correspondiente
      await Seat.findOneAndUpdate(
        { seatNumber: studentData.assignedSeat },
        { isOccupied: true, studentId: student._id }
      );
    }

    console.log('Datos de ejemplo insertados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error insertando datos de ejemplo:', error);
    process.exit(1);
  }
}

seedData();