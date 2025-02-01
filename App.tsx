import { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator, Text, StyleSheet } from "react-native";
import { io } from "socket.io-client";
import { ClassroomGrid } from "./src/client/components/ClassroomGrid";
import { api } from "./src/client/services/api";
import { Seat, Student } from "./src/client/types/types";
import { Config } from "./src/config/Config";


function App(): React.JSX.Element {
  const [students, setStudents] = useState<Student[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socketClient = io(Config.socketURL);
    setSocket(socketClient);

    socketClient.on('unauthorized-move', handleUnauthorizedMove);
    socketClient.on('student-added', handleStudentAdded);

    loadInitialData();

    return () => {
      socketClient.disconnect();
    };
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [seatsData, studentsData] = await Promise.all([
        api.getSeats(),
        api.getStudents()
      ]);

      setSeats(seatsData);
      setStudents(studentsData);
      setError(null);
    } catch (err) {
      setError('Error cargando los datos. Por favor, intente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnauthorizedMove = async (data: {
    studentId: string,
    fromSeat: number,
    toSeat: number
  }) => {
    await loadInitialData();
  };

  const handleStudentAdded = (newStudent: Student) => {
    setStudents(prev => [...prev, newStudent]);
    loadInitialData();
  };

  const handleSeatPress = async (seatNumber: number) => {
    const seat = seats.find(s => s.seatNumber === seatNumber);
    if (!seat) return;

    const student = students.find(s => s._id === seat.studentId);
    if (student && student.assignedSeat !== seatNumber) {
      try {
        await api.reportUnauthorizedMove({
          studentId: student._id,
          fromSeat: student.currentSeat || student.assignedSeat,
          toSeat: seatNumber
        });
      } catch (error) {
        console.error('Error reporting unauthorized move:', error);
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ClassroomGrid
          seats={seats}
          students={students}
          onSeatPress={handleSeatPress}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
});
export default App;