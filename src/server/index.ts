import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { connectDB } from './config/database';
import Student from './models/Student';
import Seat from './models/Seat';
import router from './routes/auth';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectDB();

app.use('/api/auth', router);

// Inicializar asientos si no existen
async function initializeSeats() {
  try {
    const count = await Seat.countDocuments();
    if (count === 0) {
      const seats = Array.from({ length: 30 }, (_, index) => ({
        seatNumber: index,
        isOccupied: false
      }));
      await Seat.insertMany(seats);
      console.log('Asientos inicializados');
    }
  } catch (error) {
    console.error('Error inicializando asientos:', error);
  }
}

// Rutas API
app.get('/api/seats', async (req, res) => {
  try {
    const seats = await Seat.find().populate('studentId');
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo asientos' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo estudiantes' });
  }
});

// Ruta para añadir un nuevo estudiante
app.post('/api/students', async (req, res) => {
  try {
    const { name, assignedSeat } = req.body;
    const student = new Student({
      name,
      assignedSeat,
      currentSeat: assignedSeat
    });
    await student.save();

    // Actualizar el asiento asignado
    await Seat.findOneAndUpdate(
      { seatNumber: assignedSeat },
      { isOccupied: true, studentId: student._id }
    );

    io.emit('student-added', student);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error añadiendo estudiante' });
  }
});

// Ruta para registrar movimiento no autorizado
app.post('/api/unauthorized-move', async (req, res) => {
  try {
    const { studentId, fromSeat, toSeat } = req.body;

    // Actualizar la posición actual del estudiante
    const student = await Student.findByIdAndUpdate(
      studentId,
      { currentSeat: toSeat },
      { new: true }
    );

    // Actualizar los asientos
    await Promise.all([
      Seat.findOneAndUpdate(
        { seatNumber: fromSeat },
        { isOccupied: false, studentId: null }
      ),
      Seat.findOneAndUpdate(
        { seatNumber: toSeat },
        { isOccupied: true, studentId: student?._id }
      )
    ]);

    io.emit('unauthorized-move', { studentId, fromSeat, toSeat });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error registrando movimiento' });
  }
});

// Socket.IO para actualizaciones en tiempo real
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  await initializeSeats();
});
