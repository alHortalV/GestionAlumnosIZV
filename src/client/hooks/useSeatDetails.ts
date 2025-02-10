import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Seat, Student } from '../types/types';
import { ApiService } from '../services/apiService';

export const useSeatDetails = (initialSeat: Seat, initialStudent: Student | null) => {
    const [isLoading, setIsLoading] = useState(false);
    const [seat, setSeat] = useState(initialSeat);
    const [student, setStudent] = useState<Student | null>(initialStudent ?? null);
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        const loadSeatData = async () => {
            try {
                const students = await ApiService.fetchStudents();
                const studentInSeat = students.find(s => s.currentSeat === seat.seatNumber);

                if (studentInSeat) {
                    setStudent(studentInSeat);
                    setSeat(prev => ({ ...prev, isOccupied: true }));
                }
            } catch (error) {
                console.error('Error al cargar los datos de los estudiantes:', error);
            }
        };

        loadSeatData();
    }, [seat.seatNumber]);

    const handleOccupySeat = async () => {
        if (!studentName.trim()) {
            Alert.alert('Error', 'Por favor, ingresa un nombre válido.');
            return;
        }

        try {
            setIsLoading(true);
            const newStudent = await ApiService.createStudent({
                name: studentName,
                assignedSeat: seat.seatNumber,
            });

            await ApiService.authorizeMove({
                studentId: newStudent._id,
                fromSeat: student?.currentSeat ?? undefined,
                toSeat: seat.seatNumber,
            });

            setStudent(newStudent);
            setSeat(prev => ({ ...prev, isOccupied: true }));

            Alert.alert('Asiento ocupado', `El asiento ha sido ocupado por ${newStudent.name}.`);
        } catch (error) {
            Alert.alert('Error', 'No se pudo ocupar el asiento. Intenta de nuevo.');
            console.error('Error al ocupar asiento:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVacateSeat = async (studentId: string) => {
        if (!student) {
            Alert.alert('Error', 'No hay ningún estudiante en este asiento.');
            return;
        }

        try {
            setIsLoading(true);
            await ApiService.authorizeMove({
                studentId: student._id,
                fromSeat: seat.seatNumber,
                toSeat: -1
            });
            await ApiService.removeStudent(studentId);
            setStudent(null);
            setSeat(prev => ({ ...prev, isOccupied: false }));

            Alert.alert('Asiento desocupado', `El asiento ha sido desocupado.`);
        } catch (error) {
            Alert.alert('Error', 'No se pudo desocupar el asiento. Intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        seat,
        student,
        studentName,
        setStudentName,
        handleOccupySeat,
        handleVacateSeat,
    };
};