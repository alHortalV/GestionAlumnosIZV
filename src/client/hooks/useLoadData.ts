import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Config } from "../../config/Config";
import { ApiService } from "../services/apiService";
import { Seat, Student } from "../types/types";
import { NavigationProp } from "@react-navigation/native";


export const useClassroomData = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socketClient = io(Config.socketURL);

    socketClient.on("authorized-move", handleUnauthorizedMove);
    socketClient.on("student-added", handleStudentAdded);

    loadInitialData();

    return () => {
      socketClient.disconnect();
    };
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [seatsData, studentsData] = await Promise.all([
        ApiService.fetchSeats(),
        ApiService.fetchStudents(),
      ]);
      setSeats(seatsData);
      setStudents(studentsData);
      setError(null);
    } catch (err) {
      setError("Error cargando los datos. Por favor, intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnauthorizedMove = async () => {
    await loadInitialData();
  };

  const handleStudentAdded = (newStudent: Student) => {
    setStudents((prev) => [...prev, newStudent]);
    loadInitialData();
  };

  const handleSeatPress = (seatNumber: number, navigation: NavigationProp<any>) => {
    const seat = seats.find((s) => s.seatNumber === seatNumber);
    if (!seat) return;

    const student = students.find((s) => s._id === seat.studentId);

    navigation.navigate("Detalles", { seat, student });
};


  return { students, seats, loading, error, handleSeatPress };
};
