import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Config } from "../../config/Config";
import { ApiService } from "../services/apiService";
import { Seat, Student } from "../types/types";
import { NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../contexts/store";
import { setSeats } from "../contexts/slices/seatsSlice";
import { addStudent, setStudents } from "../contexts/slices/studentsSlice";


export const useClassroomData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Obtiene los datos de Redux
  const students = useSelector((state: RootState) => state.students.students);
  const seats = useSelector((state: RootState) => state.seats.seats);

  useEffect(() => {
    const socketClient = io(Config.socketURL);

    socketClient.on("authorized-move", handleUnauthorizedMove);
    socketClient.on("student-added", handleStudentAdded);

    loadInitialData();

    return () => {
      socketClient.disconnect();
    };
  }, [dispatch]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [seatsData, studentsData] = await Promise.all([
        ApiService.fetchSeats(),
        ApiService.fetchStudents(),
      ]);
      dispatch(setSeats(seatsData));
      dispatch(setStudents(studentsData));
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
    dispatch(addStudent(newStudent));
    loadInitialData();
  };

  const handleSeatPress = (seatNumber: number, navigation: NavigationProp<any>) => {
    const seat = seats.find((s: { seatNumber: number; }) => s.seatNumber === seatNumber);
    if (!seat) return;

    const student = students.find((s: { _id: any; }) => s._id === seat.studentId);

    navigation.navigate("Detalles", { seat, student });
  };

  return { students, seats, loading, error, handleSeatPress };
};