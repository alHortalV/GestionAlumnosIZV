import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Seat, Student } from "../types/types";
import { SafeAreaView, Text, Button, StyleSheet, View, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Config } from "../../config/Config";
import { ApiService } from "../services/apiService";

type SeatDetailScreenProps = {
    route: RouteProp<RootStackParamList, "Detalles">;
    navigation: StackNavigationProp<RootStackParamList, "Detalles">;
};

const SeatDetailScreen = ({ route, navigation }: SeatDetailScreenProps) => {
    const { seat: initialSeat, student: initialStudent } = route.params;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [seat, setSeat] = useState<Seat>(initialSeat);
    const [student, setStudent] = useState<Student | null>(initialStudent ?? null);
    const [studentName, setStudentName] = useState<string>("");

    // Cargar estado del asiento al abrir la pantalla
    useEffect(() => {
        const loadSeatData = async () => {
          try {
            // Recuperar los estudiantes desde el servidor
            const students = await ApiService.fetchStudents();
      
            // Aquí verificamos si un estudiante está asignado a este asiento
            const studentInSeat = students.find(student => student.currentSeat === seat.seatNumber);
      
            if (studentInSeat) {
              // Si el asiento está ocupado, actualizamos el estado
              setStudent(studentInSeat);
              setSeat(prev => ({ ...prev, isOccupied: true }));
            }
          } catch (error) {
            console.error("Error al cargar los datos de los estudiantes:", error);
          }
        };
      
        loadSeatData();
      }, []);
      

      const handleOccupySeat = async () => {
        if (!studentName.trim()) {
          Alert.alert("Error", "Por favor, ingresa un nombre válido.");
          return;
        }
      
        try {
          setIsLoading(true);
      
          // Crear el estudiante con el nombre ingresado
          const createStudentResponse = await axios.post(`${Config.apiURL}/students`, {
            name: studentName,
            assignedSeat: seat.seatNumber,
          });
      
          if (createStudentResponse.status === 201) {
            const newStudent = createStudentResponse.data;
      
            // Actualizar el estudiante en el backend
            await ApiService.fetchStudents(); // Esto actualizaría los estudiantes si es necesario
      
            // Registrar el movimiento autorizado
            const moveResponse = await axios.post(`${Config.apiURL}/authorized-move`, {
              studentId: newStudent._id,
              fromSeat: student?.currentSeat,
              toSeat: seat.seatNumber,
            });
      
            if (moveResponse.status === 200) {
              setStudent(newStudent);
              setSeat(prev => ({ ...prev, isOccupied: true }));
      
              Alert.alert(
                "Asiento ocupado",
                `El asiento ha sido ocupado por ${newStudent.name}.`,
                [{ text: "OK", onPress: () => {} }]
              );
            }
          }
        } catch (error) {
          Alert.alert("Error", "No se pudo ocupar el asiento. Intenta de nuevo.");
          console.error('Error al ocupar asiento:', error);
        } finally {
          setIsLoading(false);
        }
      };
      const deleteStudent = async (studentId : any) => {
        try {
          const response = await axios.delete(`${Config.apiURL}/students`);
          if (response.status === 200) {
            Alert.alert("Éxito", "Estudiante eliminado exitosamente.");
          }
        } catch (error) {
          console.error('Error al eliminar estudiante:', error);
          Alert.alert("Error", "No se pudo eliminar el estudiante.");
        }
      };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Detalles del Asiento {seat.seatNumber + 1}</Text>

            {student ? (
                <View>
                    <Text>Asiento: {student.currentSeat !== null ? student.currentSeat + 1 : "N/A"}</Text>
                    <Text>Asignado a: {student.name}</Text>
                </View>
            ) : (
                <View>
                    <Text>Este asiento está vacío.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del estudiante"
                        value={studentName}
                        onChangeText={setStudentName}
                    />
                    <Button
                        title={isLoading ? "Procesando..." : "Ocupar asiento"}
                        onPress={handleOccupySeat}
                        disabled={isLoading}
                    />
                </View>
            )}

            <Button title="Volver" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default SeatDetailScreen;
