import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Seat, Student } from "../types/types";
import { SafeAreaView, Text, Button, StyleSheet, View, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Config } from "../../config/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                const storedSeats = await AsyncStorage.getItem("occupiedSeats");
                if (storedSeats) {
                    const occupiedSeats = JSON.parse(storedSeats);
                    if (occupiedSeats[seat.seatNumber]) {
                        setStudent(occupiedSeats[seat.seatNumber]); // Restaurar estudiante asignado
                        setSeat(prev => ({ ...prev, isOccupied: true })); // Marcar asiento como ocupado
                    }
                }
            } catch (error) {
                console.error("Error al cargar los datos del asiento:", error);
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

                // Guardar el nuevo estudiante en AsyncStorage
                await AsyncStorage.setItem('currentStudent', JSON.stringify(newStudent));

                // Registrar el movimiento autorizado
                const moveResponse = await axios.post(`${Config.apiURL}/authorized-move`, {
                    studentId: newStudent._id,
                    fromSeat: student?.currentSeat,
                    toSeat: seat.seatNumber,
                });

                if (moveResponse.status === 200) {
                    setStudent(newStudent);
                    setSeat(prev => ({ ...prev, isOccupied: true }));

                    // Guardar en AsyncStorage que este asiento está ocupado
                    const storedSeats = await AsyncStorage.getItem("occupiedSeats");
                    const occupiedSeats = storedSeats ? JSON.parse(storedSeats) : {};
                    occupiedSeats[seat.seatNumber] = newStudent;
                    await AsyncStorage.setItem("occupiedSeats", JSON.stringify(occupiedSeats));

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
